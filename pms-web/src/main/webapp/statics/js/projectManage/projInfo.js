/**
 * 项目信息
 */
$(function () {
    initialPage();
    load();
});

function initialPage() {
    // $(window).resize(function() {     });
    if(getQueryString('projId')!=null)vm.projId = getQueryString('projId');
}


function load(){
    $.ajax({
        url: '../../projMan/projDetail/getProjInfo?_' + $.now(),
        data: JSON.stringify({
            "projId":vm.projId
        }),
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function(data){
            vm.projInfo = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });


     $.ajax({
         url: '../../projMan/projDetail/getStepList?_' + $.now(),
         data: JSON.stringify({
            "projId": vm.projId
         }),
         type: "post",
         async: false,
         dataType: "json",
         contentType: 'application/json',
         success: function (data) {
             // if(data.length>6){
             //    vm.steps = data.slice(0,6);
             // }else{
                vm.steps = data;
             // }
         },
         error: function (XMLHttpRequest, textStatus, errorThrown) {
         }
     });
}


var vm = new Vue({
    el:'#projInfo',
    data: {
        styleObj:{/*width: ($(window).width()-200)+'px'*/},
        projId:"1",//todo 开发时先默认为1
        start:1,
        end:6,
        projInfo: {},
        steps: {}
    },
    methods : {
        stepToLeft: function(){
            vm.start--;
            vm.end--;
        },
        stepToRight: function(){
            vm.start++;
            vm.end++;
        },
        isShowStep: function(num){//是否显示步骤
            // console.log("num:"+num);
            return (vm.start <= num && num <= vm.end );
        }
    },
    computed: {
        // isStepToLeft: function(){//是否显示向左翻页
        //     if(vm==undefined){return false;}
        //     console.log("length:"+vm.steps.length+"  start:"+vm.start+"  end:"+vm.end);
        //     return (vm.steps && vm.steps.length >6 && vm.start>1);
        // },
        // isStepToRight: function(){//是否显示向右翻页
        //     if(vm==undefined){return false;}
        //     console.log("length:"+vm.steps.length+"  start:"+vm.start+"  end:"+vm.end);
        //     return (vm.steps && vm.steps.length>6 &&vm.end < vm.steps.length);
        // }
    }



});
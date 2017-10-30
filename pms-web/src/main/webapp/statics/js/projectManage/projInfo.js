/**
 * 项目信息
 */
$(function () {
    initialPage();
    load();
});

function initialPage() {
    $(window).resize(function() {
        vm.styleObj.paddingRight=(($(window).width() - 40 )/5 - 165*6/5)+'px';
    });
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
            vm.steps = data;
         },
         error: function (XMLHttpRequest, textStatus, errorThrown) {
         }
     });
}


var vm = new Vue({
    el:'#projInfo',
    data: {
        styleObj:{paddingRight: (($(window).width() - 40 )/5 - 165*6/5)+'px'},
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
            return (vm.start <= num && num <= vm.end );
        }
    },
    computed: {
    }



});
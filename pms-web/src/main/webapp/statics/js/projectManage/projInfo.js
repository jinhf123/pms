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
             if(data.length>6){
                vm.steps = data.slice(0,6);
             }else{
                vm.steps = data;
             }
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
        projInfo: {},
        steps: {}
    },
    methods : {
    }
});
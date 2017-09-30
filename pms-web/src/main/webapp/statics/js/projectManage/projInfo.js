/**
 * 项目信息
 */
$(function () {
    initialPage();
});

function initialPage() {
    $(window).resize(function() {     });
    $.ajax({
        url: '../../projMan/projDetail/getProjInfo?_' + $.now(),
        data: JSON.stringify({
            "projId":vm.projId
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.projInfo = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogMsg(errorThrown, 'error');
        }
    });


    $.ajax({
        url: '../../projMan/projDetail/getStepList?_' + $.now(),
        data: JSON.stringify({
            "projId": vm.projId
        }),
        type: "post",
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
            dialogMsg(errorThrown, 'error');
        }
    });


}


var vm = new Vue({
    el:'#projInfo',
    data: {
        styleObj:{width: ($(window).width()-200)+'px'},
        projId:"1",
        projInfo: {},
        steps: {}
    },
    methods : {
    }
});
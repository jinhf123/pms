/**
 * 项目信息
 */
$(function () {
    initialPage();
});

function initialPage() {
    // $(window).resize(function() {  });
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
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
}


var vm = new Vue({
    el:'#projInfo',
    data: {
        projId:"1",
        projInfo: {}
    },
    methods : {
    }
});
/**
 * 项目管理js
 */

$(function () {
    initialPage();
    getGrid();
});

function initialPage(){
    vm.projId = getQueryString('projId');
    vm.stepId = getQueryString('stepId');
    vm.taskId = getQueryString('taskId');

    $(window).resize(function() { });
    //获取任务信息
    $.ajax({
        url: '../../projMan/projDetail/getTaskInfo?_' + $.now(),
        data: JSON.stringify({
            "taskId" : vm.taskId,
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.taskInfo = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

function getGrid(){



}



var vm = new Vue({
    el:'#taskDetails',
    data: {
        projId:"",
        stepId:"",
        taskId:"",
        taskInfo:{}
    },
    methods : {
        load: function(id) {
        },backTaskInfo: function(){
            toUrl('projProgress.html?projId='+vm.projId+'&stepId='+vm.stepId);
        }
    },
    computed: {}
});


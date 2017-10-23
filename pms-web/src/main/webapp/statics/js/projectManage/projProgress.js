/**
 * 项目进度任务
 */
$(function () {
    initialPage();
    getProjectInfo();
    getStepList();
    var param = JSON.stringify({
        "projId":vm.projId,
        "stepId":vm.stepId
    });
    getTaskGrid(param);
    getScheGrid(param);
});



function initialPage() {
    if(getQueryString('projId')!=null)
    vm.projId = getQueryString('projId');
    //初始化滚动条
    $(".left-panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(".center-panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(".slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    //窗口大小改变重新调整大小
    $(window).resize(function() {
        vm.styleObj.height = ($(window).height()-5)+"px";
        $(".left-panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        $(".center-panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        $(".slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });

    $("#finishDate").datetimepicker().on('change', function () {
        vm.finishDate = $("#finishDate").val();
    });
}

//获取项目信息
function getProjectInfo(){
    $.ajax({
        url: '../../projMan/projDetail/getProjectInfo?_' + $.now(),
        data: JSON.stringify({
            "projId" : vm.projId,
        }),
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.projectInfo = data;
        }
    });
}
//获取项目步骤数据
function getStepList() {
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
        }
    });
};

//获取任务数据列表
function getTaskGrid(param) {
    vm.styleObj.height = ($(window).height()-5)+"px";
    $.ajax({
        url: '../../projMan/projDetail/getTaskList?_' + $.now(),
        data: param,
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.tasks = data;
        }
    });
};

//获取日程数据列表
function getScheGrid(param) {
    $.ajax({
        url: '../../projMan/projDetail/getScheduleList?_' + $.now(),
        data: param,
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.schedules = data;
        }
    });
};

//保存任务
function saveTask(){
    console.log("保存任务");
    var param = JSON.stringify({
        "parentTask":vm.parentTask,
        "projId":vm.projId,
        "stepId":vm.stepId,
        "taskTitle":vm.taskTitle,
        "taskStaff":vm.taskStaff,
        "taskStaffId":vm.taskStaffId,
        "finishDate":vm.finishDate,
    });
    $.ajax({
        url: '../../projMan/projDetail/saveTask?_' + $.now(),
        data: param,
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.isAddTask=false;
            vm.parentTask="";
            vm.taskTitle="";
            vm.taskStaff="";
            vm.taskStaffId="";
            vm.finishDate="";
            var param2 = JSON.stringify({
                "projId":vm.projId,
                "stepId":vm.stepId,
                "taskId":vm.taskId
            });
            getTaskGrid(param2);
        }
    });
};



var vm = new Vue({
    el:'#projProgress',
    data: {
        styleObj:{height: ($(window).height()-5)+'px'},
        icon_Title : "/statics/img/projectManage/u15.png",
        icon_User : "/statics/img/projectManage/u16.png",
        icon_Date : "/statics/img/projectManage/u17.png",
        isEdit:false,
        isAddTask:false,
        isAddSche:false,

        //项目信息
        projectInfo:{projectName:"",allStep:"",unCompStep:"",unCompTask:"",unCompSchedule:""},

        //查询参数
        projId:"1",
        stepId:"9",
        taskId:"",

        //新增任务参数
        parentTask:"",
        taskTitle:"",
        taskStaff:"",
        taskStaffId:"",
        finishDate:"",

        //新增日程参数
        content:"",
        participant:"",
        scheEndDate:"",
        //列表查询结果
        steps:[],
        tasks:[],
        schedules:[]
    },
    methods : {
        load: function(id) {//加载列表
            this.stepId = id;
            var param = JSON.stringify({
                "projId":vm.projId,
                "stepId":vm.stepId,
                "taskId":vm.taskId
            });
            getTaskGrid(param);
            getScheGrid(param);
        },
        showDetail:function(taskId){
            toUrl('taskDetails.html?projId='+vm.projId+'&stepId='+vm.stepId+'&taskId='+taskId);
        },
        selectStaff: function() {
            dialogOpen({
                id: 'staffSelect',
                title: '人员选择',
                url: 'base/user/staff.html?_' + $.now(),
                scroll : true,
                width: "600px",
                height: "600px",
                yes : function(iframeId) {
                    top.frames[0].projProgress.vm.taskStaff = top.frames[iframeId].vm.userName;
                    top.frames[0].projProgress.vm.taskStaffId = top.frames[iframeId].vm.userId;
                    var index = top.layer.getFrameIndex(iframeId); //先得到当前iframe层的索引
                    top.layer.close(index); //再执行关闭
                }
            })
        },
        finishStage: function(id) {//完成本阶段
            $.ajax({
                url: '../../projMan/projDetail/finishStage?_' + $.now(),
                data: JSON.stringify({
                    stepId:id
                }),
                type: "post",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    getStepList();
                }
            });
        },
        queryAllTask: function(){//查看所有任务
            var param = JSON.stringify({
                "projId":vm.projId,
                "stepId":"",
                "taskId":vm.taskId
            });
            getTaskGrid(param);
        },
        editTask: function(){//任务编辑
            this.isEdit=!this.isEdit;
            this.isAddTask=false;
        },
        startTask: function(id){
            console.log("开始任务"+id);
            $.ajax({
                url: '../../projMan/projDetail/updateTaskState?_' + $.now(),
                data: JSON.stringify({
                    operation:"start",
                    taskId:id
                }),
                type: "post",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    var param = JSON.stringify({
                        "projId":vm.projId,
                        "stepId":vm.stepId,
                        "taskId":vm.taskId
                    });
                    getTaskGrid(param);
                }
            });
        },
        finishTask: function(id,level){
            if(level==1){
                //todo 若有子任务未完成则弹窗提醒

            }
            console.log("完成任务"+id);
            $.ajax({
                url: '../../projMan/projDetail/updateTaskState?_' + $.now(),
                data: JSON.stringify({
                    operation:"finish",
                    taskId:id
                }),
                type: "post",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    var param = JSON.stringify({
                        "projId":vm.projId,
                        "stepId":vm.stepId,
                        "taskId":vm.taskId
                    });
                    getTaskGrid(param);
                }
            });
        },
        delTask:function(id,subTaskList){
            console.log("删除任务"+id);
            if(subTaskList!=null){
                dialogMsg("请先删除子任务！");
                return;
            }
            $.ajax({
                url: '../../projMan/projDetail/deleteTask?_' + $.now(),
                data: JSON.stringify({
                    taskId:id
                }),
                type: "post",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                success: function (data){
                    var param = JSON.stringify({
                        "projId":vm.projId,
                        "stepId":vm.stepId,
                        "taskId":vm.taskId
                    });
                    getTaskGrid(param);
                }
            });
        },
        addTaskPanel:function(id){
            console.log("打开新增任务面板");
            vm.parentTask=(id!=null&&id!="")?id:"";
            vm.taskTitle="";
            vm.taskStaff="";
            vm.taskStaffId="";
            vm.finishDate="";
            this.isAddTask=true;
        },
        addTask:function(){
            console.log("添加任务保存！");
            this.isAddTask=!this.isAddTask;
            saveTask();
        },
        closeTaskPanel:function () {
            this.isAddTask=!this.isAddTask;
        },
        queryAllSche: function(){
            console.log("查看所有日程！");
            var param = JSON.stringify({
                "projId":vm.projId,
                "stepId":"",
                "taskId":vm.taskId
            });
            getScheGrid(param);
        },
        addSchePanel:function(){
            this.isAddSche=true;
        },
        addSche:function(){
            this.isAddSche=!this.isAddSche;
            saveTask();
        },
        closeSchePanel:function () {
            this.isAddSche=!this.isAddSche;
        }
    },
    computed: {

    }
});
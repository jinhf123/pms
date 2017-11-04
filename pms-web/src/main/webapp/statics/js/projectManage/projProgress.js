/**
 * 项目进度任务
 */
$(function () {
    initialPage();
    getProjectInfo();
    getStepList();
});

//初始化页面
function initialPage() {
    if(getQueryString('projId')!==null)
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


    $("#scheDate").datetimepicker().on('change', function () {
        vm.scheDate = $("#scheDate").val();
    });


}
//获取项目信息
function getProjectInfo(){
    $.ajax({
        url: '../../projMan/projDetail/getProjectInfo?_' + $.now(),
        data: JSON.stringify({
            "projId" : vm.projId
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
        url: '/projMan/projDetail/getStepList?_' + $.now(),
        data: JSON.stringify({
            "projId": vm.projId
        }),
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.steps = data;
            vm.stepId = data[0].stepId;
            vm.stepName = data[0].stepName;
            for(var i =0;i<data.length;i++){
                if("1"===data[i].state) {
                    vm.stepId = data[i].stepId;
                    vm.stepName= data[i].stepName;
                    break;
                }
            }
            var param = {
                "state":"0",
                "projId":vm.projId,
                "stepId":vm.stepId
            };
            getTaskGrid(param);
            getScheGrid(param);
        }
    });
}
//获取任务数据列表
function getTaskGrid(param) {
    vm.styleObj.height = ($(window).height()-5)+"px";
    $.ajax({
        url: '/projMan/projDetail/getTaskList?_' + $.now(),
        data: JSON.stringify(param),
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.tasks = data;
        }
    });
}
//获取日程数据列表
function getScheGrid(param) {
    $.ajax({
        url: '/schedule/projSche/getProjScheList?_' + $.now(),
        data: JSON.stringify(param),
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            if(param.state==="0"){
                vm.unCompSchedule=data.length;//未完成日程
            }
            if(param.state==="0"&&data.length===0){
                param.state ="1";
                getScheGrid(param);
            }else{
                vm.schedules = data;
            }
        }
    });
}
//保存任务
function saveTask(){
    console.log("保存任务");
    var param = {
        "parentTask":vm.parentTask,
        "projId":vm.projId,
        "stepId":vm.stepId,
        "taskTitle":vm.taskTitle,
        "taskStaff":vm.taskStaff,
        "taskStaffId":vm.taskStaffId,
        "finishDate":vm.finishDate
    };
    $.ajax({
        url: '/projMan/projDetail/saveTask?_' + $.now(),
        data: JSON.stringify(param),
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            if(data.success){
                vm.taskId=data.taskId;
                vm.isAddTask=false;
                vm.parentTask="";
                vm.taskTitle="";
                vm.taskStaff="";
                vm.taskStaffId="";
                vm.finishDate="";
                var param2 = {
                    "projId":vm.projId,
                    "stepId":vm.stepId
                };
                getTaskGrid(param2);
            }else{
                dialogAlert(data.msg,"error");
            }
        }
    });
}
//保存日程
function saveSche(){
    console.log("保存日程");
    var param = {
        "projId":vm.projId,
        "stepId":vm.stepId,
        "content":vm.content,
        "participant":vm.participant,
        "participantName":vm.participantName,
        "scheEndDate":vm.scheDate
    };
    $.ajax({
        url: '/schedule/projSche/saveProjSche?_' + $.now(),
        data: JSON.stringify(param),
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            if(data.success){
                vm.isAddSche=false;
                vm.content="";
                vm.participant="";
                vm.participantName="";
                vm.scheDate="";
                var param2 = {
                    "state":"0",
                    "projId":vm.projId,
                    "stepId":vm.stepId
                };
                getScheGrid(param2)
            }else{
                dialogAlert(data.msg,"error");
            }
        }
    });
}


var vm = new Vue({
    el: '#projProgress',
    data: {
        styleObj: {height: ($(window).height() - 5) + 'px'},
        icon_Title: "/statics/img/projectManage/u15.png",
        icon_User: "/statics/img/projectManage/u16.png",
        icon_Date: "/statics/img/projectManage/u17.png",
        isEdit: false,
        isAddTask: false,
        isAddSche: false,

        //项目信息
        projectInfo: {projectName: "", allStep: "", unCompStep: "", unCompTask: ""},
        unCompSchedule: "0",//未完成日程数

        //查询参数
        projId: "",
        stepId: "",
        stepName: "",//上传文件目录 projId/stepName
        taskId: "",

        //新增任务参数
        parentTask: "",
        taskTitle: "",
        taskStaff: "",
        taskStaffId: "",
        finishDate: "",
        //新增日程参数
        content: "",
        participant: "",
        participantName: "",
        scheEndDate: "",
        scheStartDate: "",
        repeatFlag: true,
        repeatDay: "",
        noticeFlag: true,
        noticeDay: "",

        //列表查询结果
        steps: [],
        tasks: [],
        schedules: []
    },
    methods: {
        load: function (id) {//加载列表
            vm.stepId = id;
            var param = {
                "projId": vm.projId,
                "stepId": vm.stepId,
                "taskId": vm.taskId
            };
            getTaskGrid(param);
            getScheGrid(param);
        },
        showDetail: function (taskId) {
            toUrl('taskDetails.html?projId=' + vm.projId + '&stepId=' + vm.stepId + '&taskId=' + taskId + "&stepName=" + vm.stepName);
        },
        selectStaff: function () {//添加任务选择人员
            dialogOpen({
                id: 'staffSelect',
                title: '人员选择',
                url: '/base/user/staff.html?singleSelect=true',
                scroll: true,
                width: "600px",
                height: "600px",
                yes: function (iframeId) {
                    window.vm.taskStaff = top.frames[iframeId].vm.userName;
                    window.vm.taskStaffId = top.frames[iframeId].vm.userId;
                    var index = top.layer.getFrameIndex(iframeId); //先得到当前iframe层的索引
                    top.layer.close(index); //再执行关闭
                }
            })
        },
        selectScheStaff: function () {//添加日程选择人员 //todo 要修改为可翻页的多选
            dialogOpen({
                id: 'staffSelect',
                title: '人员选择',
                url: '/base/user/staff.html?singleSelect=false',
                scroll: true,
                width: "600px",
                height: "600px",
                yes: function (iframeId) {
                    var users = top.frames[iframeId].vm.getSelections;
                    var ids = "";
                    var names = "";
                    for (var i = 0; i < users.length; i++) {
                        ids = ids + users[i].userId + ",";
                        names = names + users[i].username + ",";
                    }
                    ids = ids.substr(0, ids.length - 1);
                    names = names.substr(0, names.length - 1);
                    window.vm.participant = ids;
                    window.vm.participantName = names;
                    var index = top.layer.getFrameIndex(iframeId); //先得到当前iframe层的索引
                    top.layer.close(index); //再执行关闭
                }
            })
        },
        finishStage: function (step) {//完成本阶段
            if (step.compTask !== step.allTask) {
                dialogAlert("还有未完成的任务不能完成本阶段!", "warn");
                return;
            }
            $.ajax({
                url: '/projMan/projDetail/finishStage?_' + $.now(),
                data: JSON.stringify({
                    "projId": vm.projId,//完成本阶段后自动开始下阶段用
                    "stepId": step.stepId
                }),
                type: "post",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                success: function () {
                    getStepList();
                }
            });
        },
        queryAllTask: function () {//查看所有任务
            var param = {
                "projId": vm.projId,
                "stepId": "",
                "taskId": vm.taskId
            };
            getTaskGrid(param);
        },
        editTask: function () {//任务编辑
            vm.isEdit = !vm.isEdit;
            vm.isAddTask = false;
        },
        startTask: function (id) {//开始任务
            $.ajax({
                url: '../../projMan/projDetail/updateTaskState?_' + $.now(),
                data: JSON.stringify({
                    operation: "start",
                    taskId: id
                }),
                type: "post",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                success: function () {
                    var param = {
                        "projId": vm.projId,
                        "stepId": vm.stepId,
                        "taskId": vm.taskId
                    };
                    getTaskGrid(param);
                }
            });
        },
        finishTask: function (task) {
            var subList = task.subTaskList;
            if(subList !== null){
                for (var i = 0; i < subList.length; i++) {//若有子任务未完成则弹窗提醒
                    if (subList[i].state !== '2') {
                        dialogAlert("该一级任务有二级任务未完成，不能完成此任务!", "warn");
                        return;
                    }
                }
            }

            $.ajax({
                url: '../../projMan/projDetail/updateTaskState?_' + $.now(),
                data: JSON.stringify({
                    operation: "finish",
                    taskId: task.taskId
                }),
                type: "post",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                success: function () {
                    getStepList();//更新步骤信息,主要是更新已完成任务数
                }
            });
        },
        delTask: function (id, subTaskList) {
            console.log("删除任务" + id);
            if (subTaskList !== null) {
                dialogMsg("请先删除子任务！");
                return;
            }
            $.ajax({
                url: '../../projMan/projDetail/deleteTask?_' + $.now(),
                data: JSON.stringify({
                    taskId: id
                }),
                type: "post",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                success: function () {
                    var param = {
                        "projId": vm.projId,
                        "stepId": vm.stepId,
                        "taskId": vm.taskId
                    };
                    getTaskGrid(param);
                }
            });
        },
        addTaskPanel: function (id) {
            console.log("打开新增任务面板");
            vm.parentTask = (id !== null && id !== "") ? id : "";
            vm.taskTitle = "";
            vm.taskStaff = "";
            vm.taskStaffId = "";
            vm.finishDate = "";
            vm.isAddTask = true;
        },
        addTask: function () {//保存任务后对任务进行描述或者添加检查项
            saveTask();//保存任务
            vm.showDetail(vm.taskId);//跳转到保存的任务详细
        },
        closeTaskPanel: function () {
            vm.isAddTask = !vm.isAddTask;
        },
        queryAllSche: function () {
            console.log("查看所有日程！");
            var param = {
                "projId": vm.projId,
                "stepId": "",
                "taskId": vm.taskId
            };
            getScheGrid(param);
        },
        addSchePanel: function () {
            vm.isAddSche = true;
        },
        delSchedule: function (scheduleId) {
            $.ajax({
                url: '/schedule/projSche/deleteProjSche?_' + $.now(),
                data: JSON.stringify({
                    "scheduleId": scheduleId
                }),
                type: "post",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                success: function () {
                    var param = {
                        "state": "0",
                        "projId": vm.projId,
                        "stepId": vm.stepId
                    };
                    getScheGrid(param);
                }
            });
        },
        closeSchePanel: function () {
            vm.isAddSche = false;
        },
        addSchedule: function () {//配置其他日程属性
            vm.isAddSche = false;
            dialogContent2({
                title: "新增日程",
                width: '680px',
                height: '380px',
                content: $("#addSchedulePanel"),
                btn: false,
                success: function (layero, index) {//窗口打开成功
                    console.log(layero, index);
                    $("#scheStartDate").datetimepicker().on('change', function () {
                        vm.scheStartDate = $("#scheStartDate").val();
                    });
                    $("#scheEndDate").datetimepicker().on('change', function () {
                        vm.scheEndDate = $("#scheEndDate").val();
                    });
                    vm.scheEndDate = vm.scheDate;
                }
            });
        },
        saveSchedule: function () {//保存日程配置信息
            console.log("保存日程");
            var param = {
                "projId": vm.projId,
                "stepId": vm.stepId,
                "content": vm.content,
                "participant": vm.participant,
                "participantName": vm.participantName,
                "scheStartDate": vm.scheStartDate,
                "scheEndDate": vm.scheEndDate
            };
            $.ajax({
                url: '/schedule/projSche/saveProjSche?_' + $.now(),
                data: JSON.stringify(param),
                type: "post",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    if (data.success) {
                        vm.isAddSche = false;
                        vm.content = "";
                        vm.participant = "";
                        vm.participantName = "";
                        vm.scheStartDate = "";
                        vm.scheEndDate = "";

                        //TODO 保存重复日程、和提前通知信息到数据库中
                        layer.close(layer.index); //执行关闭

                        var param2 = {
                            "state": "0",
                            "projId": vm.projId,
                            "stepId": vm.stepId
                        };
                        getScheGrid(param2)
                    } else {
                        dialogAlert(data.msg, "error");
                    }
                }
            });
        },
        closeSchedule: function(){
            layer.close(layer.index); //执行关闭
        }
    },
    computed: {
        init:function(){//去除idea中的unused提示，稍后删除
            if(1!==1){
                vm.closeSchedule();vm.saveSchedule();vm.addSchedule();vm.closeSchePanel();
                vm.delSchedule();vm.addSchePanel();vm.queryAllSche();vm.closeTaskPanel();
                vm.addTask();vm.addTaskPanel();vm.delTask();vm.finishTask();vm.startTask();vm.editTask();
                vm.queryAllTask();vm.finishStage();vm.selectScheStaff();saveSche();
            }
        }
    }
});
/**
 * 任务详情js
 */

$(function () {
    initialPage();
    getTaskInfo();
    getCheckItemGrid();
    getTaskLogGrid();
});

function initialPage(){
    vm.projId = getQueryString('projId');
    vm.stepId = getQueryString('stepId');
    vm.stepName = getQueryString('stepName');
    vm.taskId = getQueryString('taskId');
    $("#finishDate").datetimepicker().on('change', function () {
        vm.finishDate = $("#finishDate").val();
    });
    $(".panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(window).resize(function() {
        vm.styleObj.height = ($(window).height())+"px";
        $(".panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}
//获取任务信息
function getTaskInfo(){
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
            vm.taskTitle = vm.taskInfo.taskTitle;
            vm.finishDate = vm.taskInfo.finishDate.substring(0,10);
            vm.taskStaff = vm.taskInfo.taskStaff;
            vm.taskContent = vm.taskInfo.taskContent;
            vm.taskState = vm.taskInfo.state;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

//获取检查项列表
function getCheckItemGrid(){
    $.ajax({
        url: '../../projMan/projDetail/getCheckItemList?_' + $.now(),
        data: JSON.stringify({
            "taskId" : vm.taskId,
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.checkItems = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
//获取任务日志列表
function getTaskLogGrid(){
    $.ajax({
        url: '../../projMan/projDetail/getTaskLogList?_' + $.now(),
        data: JSON.stringify({
            "taskId" : vm.taskId,
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.taskLogs = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
//保存任务详细
function saveTaskDetail(params){
    $.ajax({
        url: '../../projMan/projDetail/saveTaskInfo?_' + $.now(),
        data: params,
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            if(data.success){
                dialogMsg("操作成功！");
                isEdit:false;
                vm.isEdit=false;
                vm.isAddTaskContent=false;
                vm.load();
            }else{
                dialogMsg("操作失败！"+data.msg,"error")
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogMsg("操作失败！"+errorThrown,"error")
        }
    });
}
//保存检查项
function saveCheckItem(){
    $.ajax({
        url: '../../projMan/projDetail/saveCheckItem?_' + $.now(),
        data: JSON.stringify({
            "checkItemId" : vm.checkItemId,
            "taskId" : vm.taskId,
            "content" : vm.content,
            "state" : vm.state
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            if(data.success){
                dialogMsg("保存成功！")
                vm.isAddCheckItem=false;
                vm.checkItemId="";
                vm.content="";
                vm.state="";
                vm.load();
            }else{
                dialogMsg("保存失败！"+data.msg,"error")
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogMsg("保存失败！"+errorThrown,"error")
        }
    });
}



var vm = new Vue({
    el:'#taskDetails',
    data: {
        styleObj:{height: ($(window).height())+'px'},
        icon_Title : "/statics/img/projectManage/u15.png",
        icon_User  : "/statics/img/projectManage/u16.png",
        icon_Date  : "/statics/img/projectManage/u17.png",
        icon_oper_0: "/statics/img/projectManage/u18_0.png",
        icon_oper_1: "/statics/img/projectManage/u18_1.png",
        icon_oper_2: "/statics/img/projectManage/u18_2.png",
        icon_oper_3: "/statics/img/projectManage/u18_3.png",
        icon_oper_4: "/statics/img/projectManage/u18_4.png",
        icon_oper_0: "/statics/img/projectManage/u18_0.png",
        icon_btn_finish: "/statics/img/projectManage/u19_0.png",
        icon_btn_start : "/statics/img/projectManage/u19_1.png",
        icon_btn_delete: "/statics/img/projectManage/u19_2.png",
        icon_btn_edit  : "/statics/img/projectManage/u19_3.png",

        isEdit:false,
        isAddCheckItem:false,
        isAddTaskContent:false,
        //评论选项
        addToWorkLog:false,
        addToRiskIssues:false,
        addToWeeklyReport:true,

        projId:"",
        stepId:"",
        stepName:"",
        taskId:"",
        taskInfo:{taskTitle:"",finishDate:"",taskStaff:"",taskContent:"",state:""},
        checkItems:[],
        taskLogs:[],

        //任务修改参数
        taskTitle:"",
        finishDate:"",
        taskStaff:"",
        taskContent:"",
        taskState:"",

        //检查项新增
        checkItemId:"",
        content:"",
        state:"",

        //添加到工作日志，风险问题参数
        startDate:"",
        endDate:"",
        onChargeStaff: "",
        onChargeStaffName: "",
        resolveDate:"",
        isDialogOpen:"false",

        //发表评论
        taskLogContent:""

    },
    methods : {
        load: function() {
            getTaskInfo();
            getCheckItemGrid();
            getTaskLogGrid();
        },backTaskInfo: function(){//跳转回到任务进度页面
            toUrl('projProgress.html?projId='+vm.projId+'&stepId='+vm.stepId);
        },
        selectStaff: function() {//打开人员选择面板
            dialogOpen({
                id: 'staffSelect',
                title: '人员选择',
                url: 'base/user/staff.html?singleSelect=true',
                scroll : true,
                width: "600px",
                height: "600px",
                yes : function(iframeId) {
                    window.vm.taskStaff = top.frames[iframeId].vm.userName;
                    window.vm.taskStaffId = top.frames[iframeId].vm.userId;
                    var index = top.layer.getFrameIndex(iframeId); //先得到当前iframe层的索引
                    top.layer.close(index); //再执行关闭
                }
            })
        },

        changeTaskState:function(type){//修改任务状态
            // 完成
            if(type=="finish"&&vm.taskInfo.state!=="2"){
                var params = JSON.stringify({
                    "taskId" : vm.taskId,
                    "state" : "2"
                });
                saveTaskDetail(params);
            }
            // 标记开始
            if(type=="start"&&vm.taskInfo.state=="0"){
                var params = JSON.stringify({
                    "taskId" : vm.taskId,
                    "state" : "1"
                });
                saveTaskDetail(params);
            }
        },
        delTaskState:function(){//删除
            $.ajax({
                url: '../../projMan/projDetail/deleteTask?_' + $.now(),
                data: JSON.stringify({
                    "taskId" : vm.taskId
                }),
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    if(data.success){
                        vm.backTaskInfo();
                    }else{
                        dialogMsg("删除失败！\n"+data.msg,"error")
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    dialogMsg("操作失败！"+errorThrown,"error")
                }
            });
        },
        startEdit:function(){//开始编辑任务信息
            vm.taskTitle = vm.taskInfo.taskTitle;
            vm.finishDate = vm.taskInfo.finishDate.substring(0,10);
            vm.taskStaff = vm.taskInfo.taskStaff;
            vm.taskContent = vm.taskInfo.taskContent;
            vm.taskState = vm.taskInfo.state;
            vm.isEdit=true;
        },
        cancelEdit:function(){//取消编辑任务信息
            vm.isEdit=false;
        },
        addTaskContent:function(){
            var params = JSON.stringify({
                "taskId" : vm.taskId,
                "taskContent" : vm.taskContent
            });
            saveTaskDetail(params);
        },
        saveTaskInfo:function(){//保存任务信息
            var params = JSON.stringify({
                "taskId" : vm.taskId,
                "taskTitle" : vm.taskTitle,
                "finishDate" : vm.finishDate,
                "taskStaff" : vm.taskStaff,
                "taskContent" : vm.taskContent
            });
            saveTaskDetail(params);
        },
        addCheckItem:function(){//新增检查项保存
            if(vm.content==null||vm.content.trim()==""){
                dialogMsg("请输入检查项内容!","warn");
                return;
            }
            saveCheckItem();
        },
        checkRadio:function(data){//完成检查项保存
            if(data.state=="0")
            dialogConfirm("请确认检查项：\n\""+data.content+"\"\n是否完成!", function(){
                vm.checkItemId = data.checkItemId;
                vm.content = data.content;
                vm.state = "1";
                saveCheckItem();
            });
            getCheckItemGrid();
        },
        upload:function () {
            dialogOpen({
                id: 'staffSelect',
                title: '上传附件',
                url: 'base/util/upload.html?projId=' + vm.projId + '&folderId='+vm.stepId+'&folderName=' + vm.stepName,
                scroll : true,
                width: "600px",
                height: "420px",
                btn: false,
                end: function() {

                }
            });
        },
        saveTaskLog:function(){//发表评论
            if(vm.taskLogContent===''){
                dialogAlert("评论内容为空！","warn");
                return;
            }
            $.ajax({
                url: '../../projMan/projDetail/saveTaskLog?_' + $.now(),
                data: JSON.stringify({
                    "taskId" : vm.taskId,
                    "content" : vm.taskLogContent,
                    "operateType" : "0"
                }),
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    if(data.success){
                        // addToWorkLog();
                        // addToRiskIssues();
                        // addToWeeklyReport();
                        vm.taskLogContent = "";
                        getTaskLogGrid();
                        if(vm.addToWorkLog&&vm.addToRiskIssues){
                            vm.addWorkLogs();
                        }else if(vm.addToRiskIssues)
                            vm.addriskIssues();
                        if(vm.addToWorkLog&&!vm.addToRiskIssues){
                            vm.addWorkLogs();
                        }
                        // dialogMsg("评论成功！");
                    }else{
                        dialogMsg("评论失败！"+data.msg,"error")
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    dialogMsg("操作失败！"+errorThrown,"error")
                }
            });
        },
        addWorkLogs:function () {
            vm.isDialogOpen=true;
            dialogContent2({
                title : "添加到工作日志",
                width : '600px',
                height : '200px',
                content :  $("#workLogPanel"),
                btn : [ '确定', '取消' ],
                success: function(){
                    //TODO 初始化时间控件
                    // $("#finishDate").datetimepicker();
                },
                yes : function(index) {
                    if(isNullOrEmpty(vm.startDate)) {
                        dialogAlert('开始日期为空','info');
                        return false;
                    }
                    if(isNullOrEmpty(vm.endDate)) {
                        dialogAlert('结束日期为空','info');
                        return false;
                    }
                    layer.close(index);
                    return ;
                    //TODO 保存工作日志
                    $.ajax({
                        url: '../../projMan/workLog/saveWorkLog?_' + $.now(),
                        data: JSON.stringify({
                            "workLogDate" : formatDate(new Date(),"yyyy-MM-dd"),
                            "startTime" : "08:00",
                            "endTime" : "08:00",
                            "minutes" : 0,
                            "isProjectWork" : "1",
                            "project" : vm.projId,
                            "task" : vm.taskId,
                            "workDetails" : vm.taskLogContent
                        }),
                        type: "post",
                        dataType: "json",
                        contentType: 'application/json',
                        success: function (data) {
                        }
                    });


                },
                end:function(){
                    if(vm.addToRiskIssues)
                        vm.addriskIssues();
                }
            });
        },
        addriskIssues:function(){
            vm.isDialogOpen=true;
            dialogContent2({
                title : "添加到风险问题",
                width : '600px',
                height : '200px',
                content :  $("#riskIssuesPanel"),
                btn : [ '确定', '取消' ],
                success: function(){
                    //TODO 初始化时间控件

                    vm.resolveDate =  vm.addSevenDate;

                    $("#resolveDate").datetimepicker().on('change', function () {
                        vm.resolveDate = $("#resolveDate").val();
                    });
                },
                yes : function(index) {
                    if(isNullOrEmpty(vm.onChargeStaff)) {
                        dialogAlert('请指定解决人！','info');
                        return false;
                    }
                    if(isNullOrEmpty(vm.resolveDate)) {
                        dialogAlert('请指定解决日期','info');
                        return false;
                    }
                    $.ajax({
                        url: '../../riskIssue/projRisk/saveRiskIssue',
                        data: JSON.stringify({
                            "projId":vm.projId,
                            "taskId":vm.taskId,
                            "content":vm.taskTitle+"-"+vm.taskLogContent,//风险内容
                            "remark":"来自任务评论",//备注
                            "resolventDate":vm.resolveDate,//解决时间  当前日期加7天
                            "onChargeStaff":vm.onChargeStaff//负责人
                        }),
                        type: "post",
                        dataType: "json",
                        contentType: 'application/json',
                        success: function (data) {
                            if(data.success){
                                dialogMsg("保存成功！");
                                layer.close(index);
                            }else{
                                dialogMsg("保存失败！"+data.msg,"error")
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            dialogLoading(false);
                            dialogMsg(errorThrown, 'error');
                        }
                    });
                },
                end:function(){
                }
            });
        },
        selectStaff: function(){
            dialogOpen({
                id: 'staffSelect',
                title: '人员选择',
                url: 'base/user/staff.html?singleSelect=true',
                scroll : true,
                width: "600px",
                height: "600px",
                yes : function(iframeId) {
                    var userId=top.frames[iframeId].vm.userId;
                    var userName = top.frames[iframeId].vm.userName;
                    window.vm.onChargeStaff = userId;
                    window.vm.onChargeStaffName = userName;
                    top.layer.close(top.layer.getFrameIndex(iframeId));//先得到当前iframe层的索引再执行关闭
                }
            })
        }

    },
    computed: {
        addSevenDate: function(){
            var date = new Date();
            date.setDate(date.getDate()+7);
            var m = date.getMonth()+ 1;
            return date.getFullYear()+ '-'+m+'-'+ date.getDate();
        }
    }
});


/**
 * 项目管理js
 */

$(function () {
    initialPage();
    getTaskInfo();
    getCheckItemGrid();
    getTaskLogGrid();
});

function initialPage(){
    $(".panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    vm.projId = getQueryString('projId');
    vm.stepId = getQueryString('stepId');
    vm.taskId = getQueryString('taskId');
    $(window).resize(function() {
        vm.styleObj.height = ($(window).height())+"px";
        $(".panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}

function getTaskInfo(){
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
            dialogMsg("保存成功！")
            vm.isAddCheckItem=false;
            vm.checkItemId="";
            vm.content="";
            vm.state="";
            vm.load();
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

        isEdit:false,
        isAddCheckItem:false,
        projId:"",
        stepId:"",
        taskId:"",
        taskInfo:{taskTitle:"",finishDate:"",taskStaff:"",taskContent:""},
        checkItems:[],
        taskLogs:[],

        //任务修改参数
        taskTitle:"",
        finishDate:"",
        taskStaff:"",
        taskContent:"",
        //检查项新增
        checkItemId:"",
        content:"",
        state:""
    },
    methods : {
        load: function() {
            getTaskInfo();
            getCheckItemGrid();
            getTaskLogGrid();
        },backTaskInfo: function(){
            toUrl('projProgress.html?projId='+vm.projId+'&stepId='+vm.stepId);
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
        saveTaskInfo:function(){
            $.ajax({
                url: '../../projMan/projDetail/getTaskInfo?_' + $.now(),
                data: JSON.stringify({
                    "taskTitle" : vm.taskTitle,
                    "finishDate" : vm.finishDate,
                    "taskStaff" : vm.taskStaff,
                    "taskContent" : vm.taskContent
                }),
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    dialogMsg("保存成功！")
                    isEdit:false;
                    load();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    dialogMsg("保存失败！"+errorThrown,"error")
                }
            });
        },
        startEdit:function(){
            vm.taskTitle = vm.taskInfo.taskTitle;
            vm.finishDate = vm.taskInfo.finishDate;
            vm.taskStaff = vm.taskInfo.taskStaff;
            vm.taskContent = vm.taskInfo.taskContent;
            vm.isEdit=true;
        },
        cancelEdit:function(){
            vm.isEdit=false;
        },
        openAddCheckItem:function(){
            vm.isAddCheckItem=true;
        },
        cancelAddCheckItem:function(){
            vm.isAddCheckItem=false;
        },
        addCheckItem:function(){
            if(vm.content==null||vm.content.trim()==""){
                dialogMsg("请输入检查项内容!","warn");
                return;
            }
            saveCheckItem();
        },
        checkRadio:function(data){
            if(data.state=="0")
            dialogConfirm("请确认检查项：\n\""+data.content+"\"\n是否完成!", function(){
                vm.checkItemId = data.checkItemId;
                vm.state = "1";



                saveCheckItem();
            });
            getCheckItemGrid();
        }

    },
    computed: {
    }
});


/**
 * 项目管理js
 */

$(function () {
    initialPage();
    getNotice();
});

function initialPage(){
    //初始化滚动条
    $(".group-slimScroll").slimScroll({height: '200px', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(".dropdown-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(window).resize(function() {//改变窗口大小后触发
        vm.styleObj.height = ($(window).height()-65)+"px";
        $(".group-slimScroll").slimScroll({height: '200px', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        $(".dropdown-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
    getProjGroups();
}

function getNotice(){//获取未读通知列表
    $.ajax({
        url: '../projMan/notice/unReadList?_' + $.now(),
        data: JSON.stringify({}),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.noticeDate = data;
            vm.unReadNotice = data.length;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
}

//获取项目类型数据
function getProjGroups() {
    $.ajax({
        url: '../sys/macro/getMacroByCatalog?_' + $.now(),  //'../projMan/project/projGroup?_' + $.now(),
        data: JSON.stringify({
            "typeCodes": ['projGroup']
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.groups = data.projGroup?data.projGroup:[];
            vm.activeGroup = data.projGroup[0]?data.projGroup[0]:{};
            vm.groupId = data.projGroup[0].value?data.projGroup[0].value:"";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
}

var vm = new Vue({
    el:'#project',
    data: {
        icon_Search :"../statics/img/projectManage/u1.png",
        icon_Add    :"../statics/img/projectManage/u2.png",
        icon_Notice :"../statics/img/projectManage/u3.png",
        icon_Log    :"../statics/img/projectManage/u4.png",
        styleObj: {height: ($(window).height()-65)+'px'},
        //通知信息
        unReadNotice:0,
        noticeDate:[],
        //初始化默认展示页面
        iframeSrc:"projectList.html",
        iframeId:"projectList",
        iframeName:"projectList",
        //子页面iframe的vm
        iframeVm:"",
        //所属下拉菜单数据
        activeGroup: {},
        groups: [],
        //新增项目组
        groupName:"",
        //查询条件
        keyword: "",
        groupId: ""//选中的所属项目组类型
    },
    methods : {
        query: function(){//点击查询按钮
            vm.iframeVm = document.getElementById(vm.iframeId).contentWindow.vm;
            vm.iframeVm.keyword = vm.keyword;
            vm.iframeVm.groupId = vm.groupId;
            vm.iframeVm.query();
        },
        selectGroup: function(group){//选中所属项目组
            vm.iframeVm = document.getElementById(vm.iframeId).contentWindow.vm;
            vm.activeGroup = group;
            vm.groupId = group.value
            vm.iframeVm.keyword = vm.keyword;
            vm.iframeVm.groupId = vm.groupId;
            vm.iframeVm.query();
        },
        showNotice: function (notice){//消息标记为已读后打开任务详情
            $.ajax({
                url: '../projMan/notice/readNotice?_' + $.now(),
                data: JSON.stringify({
                    "noticeId" : notice.noticeId,
                    "isRead" : 1
                }),
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    if(data.success){
                        vm.getTaskInfo(notice.taskId);//打开任务详情
                        getNotice();
                    } else {
                        dialogAlert("读取消息失败！错误信息："+data.msg,"error")
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    dialogLoading(false);
                    dialogAlert(errorThrown, 'error');
                }
            });
        },
        getTaskInfo: function(taskId){
            $.ajax({
                url: '../projMan/projDetail/getTaskInfo?_' + $.now(),
                data: JSON.stringify({
                    "taskId" : taskId
                }),
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    window.open("taskDetails.html?projId="+data.projId+"&stepId="+data.stepId+""+"&stepName="+data.stepName+"&taskId="+taskId,
                        '任务详情', 'height=500, width=1000, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=0, status=no');
                    // toUrl("taskDetails.html?projId="+data.projId+"&stepId="+data.stepId+""+"&stepName="+data.stepName+"&taskId="+taskId);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
        },
        addProject: function(){//跳转到新增项目页面
            vm.iframeSrc="projAdd.html";
            vm.iframeId="projAdd";
            vm.iframeName="projAdd";
        },
        openWorkLog: function(){//打开工作日志窗口
            window.open('workLog.html', '工作日志', 'height=500, width=1000, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=0, status=no');
        },
        selectTab: function (type) {
            switch (type){
                case 1:
                    vm.iframeSrc="projectList.html";
                    vm.iframeId="projectList";
                    vm.iframeName="projectList";
                    break;
                case 2:
                    vm.iframeSrc="developing.html";
                    vm.iframeId="developing";
                    vm.iframeName="developing";
                    break;
                case 3:
                    vm.iframeSrc="developing.html";
                    vm.iframeId="developing";
                    vm.iframeName="developing";
                    break;
                case 4:
                    vm.iframeSrc="developing.html";
                    vm.iframeId="developing";
                    vm.iframeName="developing";
                    break;
            }
        },
        addGroup: function(){//新增所属项目组
            dialogContent2({
                title : "新增所属项目组",
                width : '600px',
                height : '160px',
                content :  $("#addGroupPanel"),
                btn : [ '确定', '取消' ],
                yes : function(index) {
                    if(isNullOrEmpty(vm.groupName)) {
                        dialogAlert('项目组名称为空！','warn');
                        return false;
                    }
                    $.ajax({
                        url: '../projMan/project/addProjectGroup?_' + $.now(),
                        data: JSON.stringify({
                            "typeCodes": "projGroup",
                            "typeName": vm.groupName
                        }),
                        type: "post",
                        dataType: "json",
                        contentType: 'application/json',
                        success: function (data) {
                            if (data.success) {
                                layer.close(index);
                                getProjGroups();
                            } else {
                                dialogAlert(data.msg, 'error');
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            dialogLoading(false);
                            dialogAlert(errorThrown, 'error');
                        }
                    });
                },
                end:function(){
                    vm.groupName = "";
                }
            });
        }
    },
    computed: {}
});


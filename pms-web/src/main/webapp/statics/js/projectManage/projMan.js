/**
 * 项目管理js
 */

$(function () {
    initialPage();
    getNotice();
});

function initialPage(){
    //初始化滚动条
    $(".dropdown-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(window).resize(function() {//改变窗口大小后触发
        vm.styleObj.height = ($(window).height()-65)+"px";
        $(".dropdown-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
    getProjGroups();
}

function getNotice(){//获取未读通知列表
    $.ajax({
        url: '/projMan/notice/unReadList?_' + $.now(),
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
        url: '/sys/macro/getMacroByCatalog?_' + $.now(),  //'../../projMan/project/projGroup?_' + $.now(),
        data: JSON.stringify({
            "typeCodes": ['projType','projGroup']
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            debugger;
            //vm.types = data.projType
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
        icon_Search :"/statics/img/projectManage/u1.png",
        icon_Add    :"/statics/img/projectManage/u2.png",
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
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
        activeGroup: { name: '中国电信XXX项目组[2017]', value: '1' },
        groups: [
            { name: '中国电信XXX项目组[2017]', value: '1' },
            { name: '中国电信XXX项目组[2016]', value: '2' },
            { name: '中国电信XXX项目组[2015]', value: '3' }
        ],
        //查询条件
        keyword: "",
        groupId: "1"//选中的所属项目组类型
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
        showNotice: function (notice){
            $.ajax({
                url: '../../projMan/notice/readNotice?_' + $.now(),
                data: JSON.stringify({
                    "noticeId" : notice.noticeId,
                    "isRead" : 1 ,
                }),
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    if(data.success){
                        vm.getTaskInfo(notice.taskId);
                        getNotice();
                    }else{
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
                url: '../../projMan/projDetail/getTaskInfo?_' + $.now(),
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
        addProject: function(){
            //todo 跳转到新增项目页面
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
        addGroup: function(){

        }
    },
    computed: {}
});


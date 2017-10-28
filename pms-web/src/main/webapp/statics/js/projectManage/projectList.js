/**
 * 项目管理js
 */

$(function () {
    initialPage();
    getNotice();
    getGrid();
});


function initialPage() {
    //初始化滚动条
    $(".dropdown-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(".type-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});

    //窗口大小改变重新调整大小
	$(window).resize(function() {
        console.log("重新调整窗口大小，窗口高度："+$(window).height());
        vm.styleObject.height = ($(window).height()-45)+"px";
        $(".type-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
    getDropdownData();
}

//获取下拉框数据
function getDropdownData() {
    $.ajax({
        url: '../../projMan/project/projGroup?_' + $.now(),
        data: JSON.stringify({
            "typeCodes": ['projType', 'projGroup']
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.dropdownData = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
}



function getGrid() {
    console.log("获取列表 \tgroup:"+ vm.activeGroup.value +"\ttype:"+ vm.activeType.value+"\tkeyWord:"+ vm.keyWord);
    $.ajax({
        url: '../../projMan/project/dataGrid?_' + $.now(),
        data: JSON.stringify({
            "group" : vm.activeGroup.value,
            "type" : vm.activeType.value,
            "keyWord": vm.keyWord
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.projects = data;
            vm.length = data.length;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
}

function getNotice() {//获取未读通知列表
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




var vm = new Vue({
	el:'#dpLTE',
	data: {
        icon_Search :"/statics/img/projectManage/u1.png",
        icon_Add    :"/statics/img/projectManage/u2.png",
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        icon_FileQuery :"/statics/img/projectManage/u9.png",
        icon_EditTemp  :"/statics/img/projectManage/u10.png",

        styleObject:{height: ($(window).height()-45)+'px'},


		// 默认值
        keyWord : "",
        length : 0,

        activeGroup: {name: '中国电信XXX项目组[2017]', value: '1' },//选中的所属项目组类型
        groups: [
            { name: '中国电信XXX项目组[2017]', value: '1' },
            { name: '中国电信XXX项目组[2016]', value: '2' },
            { name: '中国电信XXX项目组[2015]', value: '3' }
        ],

        activeType : { name: '改进类', value: '1', icon: '/statics/img/projectManage/u5.png'},//选中的项目类型
        types: [
            { name: '改进类', value: '1', icon: '/statics/img/projectManage/u5.png'},
            { name: '新建类', value: '2', icon: '/statics/img/projectManage/u6.png'},
            { name: '延续类', value: '3', icon: '/statics/img/projectManage/u7.png'},
            { name: '研究类', value: '4', icon: '/statics/img/projectManage/u8.png'}
        ],

        activeProject:"",//选中的项目类型
        projects:[],

        //通知信息
        unReadNotice:0,
        noticeDate:[],

        //下拉框数据
        dropdownData:[]

	},
	methods : {
		load: function() {
            console.log("load");
		},
		save: function() {
            alert("新增项目");
		},
		edit: function() {
            alert("修改项目");
		},
		remove: function() {
            alert("删除项目");
        },
        getOptions: function(code){//根据code获取下拉框的数据



        },
        projListOn : function (e) {
            // alert("选中列表中的记录projListOn"+e);
        },
        addGroup:function(){
            alert("新增所属项目组");
        },
        selectGroup:function(group){
            vm.activeGroup = group;
            console.log("选中项目分组" + vm.activeGroup.value);
            getGrid()
        },
        selectType:function(type){
            vm.activeType = type;
            console.log("选中项目类型" + vm.activeType.text);
            // alert("选中项目类型" + vm.activeType.text);
            getGrid()
        },
        query:function () {
            console.log("查询按钮" + vm.keyWord);
            // alert(vm.keyWord);
            getGrid();
        },
        showNotice:function (notice){
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
                        '项目详情', 'height=500, width=1000, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=0, status=no');
                    // toUrl("taskDetails.html?projId="+data.projId+"&stepId="+data.stepId+""+"&stepName="+data.stepName+"&taskId="+taskId);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
        },
        location:function(act){
            if(act==="add"){
                //todo 跳转到新增页面
                // window.location=url;
            }
            if(act==="log"){
                //window.location("workLog.html");
                window.open('workLog.html', '工作日志', 'height=500, width=1000, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=0, status=no');
            }
        },
        showDetails:function(project){//跳转到项目详情页面
            vm.activeProject = project;
            toUrl('/projMan/projectDetails.html?projId='+project.projId);
        },
        editProjTemp: function(){//编辑项目模板
            toUrl('/projMan/projectTemple.html');
        }
	},
    computed: {
    }
});


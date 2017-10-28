/**
 * 项目管理js
 */

$(function () {
    initialPage();
    getGrid();
});


function initialPage() {
    //初始化滚动条
    $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    //窗口大小改变重新调整大小
    $(window).resize(function() {
        console.log("重新调整窗口大小，窗口高度："+$(window).height());
        vm.styleObject.height = ($(window).height()-45)+"px";
        $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}


function getGrid() {
   /* console.log("获取列表 \tgroup:"+ vm.activeGroup.value +"\ttype:"+ vm.activeType.value+"\tkeyword:"+ vm.keyword);
    $.ajax({
        url: '../../projMan/project/dataGrid?_' + $.now(),
        data: JSON.stringify({
            "group" : vm.activeGroup.value,
            "type" : vm.activeType.value,
            "keyword": vm.keyword
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
    });*/
}





var vm = new Vue({
    el:'#archivedProject',
    data: {
        icon_Search :"/statics/img/projectManage/u1.png",
        icon_Add    :"/statics/img/projectManage/u2.png",
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        icon_FileQuery :"/statics/img/projectManage/u9.png",
        icon_EditTemp  :"/statics/img/projectManage/u10.png",
        styleObject:{height: ($(window).height()-45)+'px'},
        // 默认值
        keyword: parent.vm.keyword,
        groupId: parent.vm.groupId,
        length : 0,
        activeGroup: {name: '中国电信XXX项目组[2017]', value: '1' },//选中的所属项目组类型
        groups: [
            { name: '中国电信XXX项目组[2017]', value: '1' },
            { name: '中国电信XXX项目组[2016]', value: '2' },
            { name: '中国电信XXX项目组[2015]', value: '3' }
        ],

        activeType :  { name: '改进类', value: '1', icon: '/statics/img/projectManage/u5.png'},//选中的项目类型
        types: [
            { name: '改进类', value: '1', icon: '/statics/img/projectManage/u5.png'},
            { name: '新建类', value: '2', icon: '/statics/img/projectManage/u6.png'},
            { name: '延续类', value: '3', icon: '/statics/img/projectManage/u7.png'},
            { name: '研究类', value: '4', icon: '/statics/img/projectManage/u8.png'}
        ],

        activeProject: {startDate: '2016-07-05', endDate: '2016-07-05',projName: '客户系统集团化升级', bigProjManager: '张三'},//选中的项目类型
        projects:[
            {startDate: '2016-07-05', endDate: '2016-07-05',projName: '客户系统集团化升级', bigProjManager: '张三'},
            {startDate: '2016-07-05', endDate: '2016-07-05',projName: '全面风险综合业务系统改造之项目管理系统优化实施', bigProjManager: '张三'},
            {startDate: '2016-07-05', endDate: '2016-07-05',projName: '表外资产管理', bigProjManager: '张三'},
            {startDate: '2016-07-05', endDate: '2016-07-05',projName: '关联与内部交易系统二期', bigProjManager: '张三'},
            {startDate: '2016-07-05', endDate: '2016-07-05',projName: '押品管理和动态估值系统完善', bigProjManager: '张三'},
            {startDate: '2016-07-05', endDate: '2016-07-05',projName: 'IFRS9减值与估值', bigProjManager: '张三'},
            {startDate: '2016-07-05', endDate: '2016-07-05',projName: '非现场审计系统建设', bigProjManager: '张三'},
            {startDate: '2016-07-05', endDate: '2016-07-05',projName: '核算三期', bigProjManager: '张三'}
        ]
    },
    methods : {
        selectType: function(type){
            vm.activeType = type;
        },
        showDetails:function(){//展示详情

        }
    },
    computed: {
    }
});


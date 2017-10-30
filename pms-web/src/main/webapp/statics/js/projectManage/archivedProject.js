/**
 * 查询已归档项目js
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
    // console.log("获取列表 \tgroup:"+ vm.activeGroup.value +"\ttype:"+ vm.activeType.value+"\tkeyword:"+ vm.keyword);
    $.ajax({
        url: '../../projMan/project/archiveDataGrid?_' + $.now(),
        data: JSON.stringify({
            "group" : vm.groupId,
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
    });
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
        //选中的项目类型
        activeType :  { name: '改进类', value: '1', icon: '/statics/img/projectManage/u5.png'},//选中的项目类型
        types: [
            { name: '改进类', value: '1', icon: '/statics/img/projectManage/u5.png'},
            { name: '新建类', value: '2', icon: '/statics/img/projectManage/u6.png'},
            { name: '延续类', value: '3', icon: '/statics/img/projectManage/u7.png'},
            { name: '研究类', value: '4', icon: '/statics/img/projectManage/u8.png'}
        ],
        //选中的项目
        activeProject: {},
        projects:[]
    },
    methods : {
        query:function(){
            // console.log("点击查询按钮查询已归档项目列表 \tkeyword=" + vm.keyword + "  groupId="+ vm.groupId);
            //alert("点击查询按钮查询已归档项目列表 \tkeyword=" + vm.keyword + "  groupId="+ vm.groupId);
            getGrid();
        },
        selectType: function(type){
            vm.activeType = type;
            getGrid();
        },
        showDetails:function(){//展示详情

        },
        backToList: function(){
            parent.window.location.href = '/projMan/projMan.html';
        }
    },
    computed: {
    }
});


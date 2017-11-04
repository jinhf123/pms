/**
 * 项目列表js
 */
$(function () {
    initialPage();
    getGrid();
});

function initialPage() {
    //初始化滚动条
    $(".type-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    //窗口大小改变重新调整大小
    $(window).resize(function() {
        vm.styleObject.height = ($(window).height())+"px";
        $(".type-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
    getProjTypes();
}

//获取项目类型数据
function getProjTypes() {
    $.ajax({
        url: '/sys/macro/getMacroByCatalog?_' + $.now(),  //'../../projMan/project/projGroup?_' + $.now(),
        data: JSON.stringify({
            "typeCodes": ['projType']
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            //vm.types = data.projType
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
}

//获取项目列表数据
function getGrid() {
    $.ajax({
        url: '../../projMan/project/dataGrid?_' + $.now(),
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
    el:'#projectList',
    data: {
        icon_FileQuery :"/statics/img/projectManage/u9.png",
        icon_EditTemp  :"/statics/img/projectManage/u10.png",
        styleObject:{height: ($(window).height())+'px'},
        //查询参数
        keyword: parent.vm.keyword,
        groupId: parent.vm.groupId,
        length : 0,
        //项目类型
        activeType : { name: '改进类', value: '1', icon: '/statics/img/projectManage/u5.png'},//选中的项目类型
        types: [
            { name: '改进类', value: '1', icon: '/statics/img/projectManage/u5.png'},
            { name: '新建类', value: '2', icon: '/statics/img/projectManage/u6.png'},
            { name: '延续类', value: '3', icon: '/statics/img/projectManage/u7.png'},
            { name: '研究类', value: '4', icon: '/statics/img/projectManage/u8.png'}
        ],
        //项目
        activeProject:"",//选中的项目类型
        projects:[],
        //下拉框数据
        dropdownData:[]
    },
    methods : {
        query:function () {
            getGrid();
        },
        projListOn : function (e) {
            // alert("选中列表中的记录projListOn"+e);
        },
        selectType:function(type){
            vm.activeType = type;
            getGrid()
        },
        showDetails:function(project){//跳转到项目详情页面
            vm.activeProject = project;
            parent.window.location.href = '/projMan/projectDetails.html?projId='+project.projId;
            // toUrl('/projMan/projectDetails.html?projId='+project.projId);
        },
        archProjQuery: function(){//跳转到归档项目查询页面
            toUrl('/projMan/archivedProject.html');
        },
        editProjTemp: function(){//编辑项目模板页面
            toUrl('/projMan/projectTemplate.html');
        }
    },
    computed: {
    }
});


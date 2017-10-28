/**
 * 项目管理js
 */

$(function () {
    initialPage();
});

function initialPage(){
    $(window).resize(function() {
        vm.styleObj.height = ($(window).height()-50)+"px";
    });
}

var vm = new Vue({
    el:'#project',
    data: {
        icon_Search :"/statics/img/projectManage/u1.png",
        icon_Add    :"/statics/img/projectManage/u2.png",
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        icon_FileQuery :"/statics/img/projectManage/u9.png",
        icon_EditTemp  :"/statics/img/projectManage/u10.png",

        //初始化默认展示页面
        iframeSrc:"archivedProject.html",
        iframeId:"project",
        iframeName:"project",

        styleObj: {height: ($(window).height()-50)+'px'},


        // 默认值
        keyWord : "",
        //下拉菜单
        activeGroup: {name: '中国电信XXX项目组[2017]', value: '1' },//选中的所属项目组类型
        groups: [
            { name: '中国电信XXX项目组[2017]', value: '1' },
            { name: '中国电信XXX项目组[2016]', value: '2' },
            { name: '中国电信XXX项目组[2015]', value: '3' }
        ]





    },
    methods : {
        query: function(){//点击查询按钮

        },
        selectGroup: function(group){//选中所属项目组

        },
        selectTab:function (type) {
            switch (type){
                case 1:
                    vm.iframeSrc="archivedProject.html";
                    vm.iframeId="projectInfo";
                    vm.iframeName="projectInfo";
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
        }


    },
    computed: {}
});


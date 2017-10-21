/**
 * 项目管理js
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
        console.log("重新调整窗口大小，窗口高度："+$(window).height());
        vm.styleObject.height = ($(window).height()-45)+"px";
        $(".type-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}

function getGrid() {
    console.log("获取列表 \tgroup:"+ vm.projectGroup.value +"\ttype:"+ vm.projectType.value+"\tkeyWord:"+ vm.keyWord);
    $.ajax({
        url: '../../projMan/project/dataGrid?_' + $.now(),
        data: JSON.stringify({
            "group" : vm.projectGroup.value,
            "type" : vm.projectType.value,
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
        projectGroup:{ text: '中国电信XXX项目组[2017]', value: '1' },
        groups: [
            { text: '中国电信XXX项目组[2017]', value: '1' },
            { text: '中国电信XXX项目组[2016]', value: '2' },
            { text: '中国电信XXX项目组[2015]', value: '3' }
        ],
        projectType: { text: '改进类', value: '1' },
        types: [
            { text: '改进类', value: '1', icon: '/statics/img/projectManage/u5.png', isSelected: true },
            { text: '新建类', value: '2', icon: '/statics/img/projectManage/u6.png'},
            { text: '延续类', value: '3', icon: '/statics/img/projectManage/u7.png'},
            { text: '研究类', value: '4', icon: '/statics/img/projectManage/u8.png'}
        ],
        projects:[],




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
        projListOn : function (e) {
            alert("选中列表中的记录projListOn");
        },
        addGroup:function(){
            alert("新增所属项目组");
        },
        selectGroup:function(group){
            vm.projectGroup = group;
            console.log("选中项目分组" + vm.projectGroup.value);
            // alert("选中项目分组" + vm.projectGroup.value);
            getGrid()
        },
        selectType:function(type){
            vm.projectType = type;
            console.log("选中项目类型" + vm.projectType.text);
            // alert("选中项目类型" + vm.projectType.text);
            getGrid()
        },
        query:function () {
            console.log("查询按钮" + vm.keyWord);
            // alert(vm.keyWord);
            getGrid();
        },
        location:function(act){
            var url;
            if(act=="add"){
                //todo 跳转到新增页面
            }
            if(act=="log"){
                url = "workLog.html";
            }
            window.location=url;
        },
        shwoDetails:function(id){
            //todo 跳转到项目详情页面
            alert("#projMan/projectDetails.html");
            window.location="#projMan/projectDetails.html";
        }
	},
    computed: {
    }
});


/**
 * 项目管理js
 */

$(function () {
    initialPage();
    getGrid();
});

function initialPage() {
	$(window).resize(function() {

		console.log("加载数据，重新调整窗口大小");
	});
}

function getGrid() {
    console.log("获取列表");
}

var vm = new Vue({
	el:'#dpLTE',
	data: {

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
        }
	}
})
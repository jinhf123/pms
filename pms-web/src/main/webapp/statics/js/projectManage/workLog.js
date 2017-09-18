/**
 * 项目管理js
 */
$(function () {
    initialPage();
    getGrid();
});

function initialPage() {
    $("#workLogData").datetimepicker({
        // format:'yyyy-mm-dd hh:ii',
        // minView:0//最精准的时间选择为日期:0-分 1-时 2-日 3-月
    });
    $("#startDate").datetimepicker();
    $("#endDate").datetimepicker();


    $(window).resize(function() {
        vm.styleObject.height = ($(window).height()-45)+"px";
    });
}

function getGrid() {
}

var vm = new Vue({
    el:'#dpLTE',
    data: {
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        styleObject:{height: ($(window).height()-45)+'px'},
        workLogData: formatDate(new Date(),"yyyy-MM-dd"),
        startDate:"",
        endDate:""
    },
    methods : {
        load: function() {
        },
        save: function() {
        },
        edit: function() {
        },
        remove: function() {
        }
    }
})
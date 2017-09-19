/**
 * 项目管理js
 */
$(function () {
    initialPage();
    getGrid();
});

function initialPage() {
    //初始化日期框
    $("#workLogDate").datetimepicker().on('hide', function (ev) {
        vm.workLogDate = $("#workLogDate").val();
    });
    $("#startDate").datetimepicker().on('hide', function (ev) {
        vm.startDate = $("#startDate").val();
    });
    $("#endDate").datetimepicker().on('hide', function (ev) {
        vm.endDate = $("#endDate").val();
    });

    //初始化滚动条
    $(".center-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});


    $(window).resize(function() {
        vm.styleObject.height = ($(window).height()-45)+"px";
        $(".center-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
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
        day: formatDate(new Date(),"dd"),
        workLogDate: formatDate(new Date(),"yyyy-MM-dd"),
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
    ,computed: {
        lastDay: function () {
            var date = new Date(this.workLogDate);
            date.setDate(date.getDate()-1);
            return formatDate(date,"dd");
        },
        nextDay: function () {
            var date = new Date(this.workLogDate);
            date.setDate(date.getDate()+1);
            return formatDate(date,"dd");
        },
        lastMonth: function () {
            var date = new Date(this.workLogDate);
            date.setDate(date.getDate()-1);
            return formatDate(date,"MM");
        }
    }


});





/**
 * 项目管理js
 */
var start = "8:00";
var end = "18:00";
$(function () {
    initialPage();
    getGrid();
});

function initialPage() {
    //初始化日期框
    $("#workLogDate").datetimepicker().on('change', function () {
        vm.workLogDate = $("#workLogDate").val();
        getGrid();
    });
    $("#startDate").datetimepicker().on('hide', function () {
        vm.startDate = $("#startDate").val();
        $("#endDate").datetimepicker('setStartDate',getDateLimit($("#startDate").val(),"00:00"));
    });
    $("#endDate").datetimepicker().on('hide', function () {
        vm.endDate = $("#endDate").val();
        $("#startDate").datetimepicker('setEndDate',getDateLimit($("#endDate").val(),"24:00"));
    });



    $("#startTime").datetimepicker({
        format:'hh:ii',
        minView:0,
        startView: 1,
        minuteStep:30
    }).on('show', function () {
        $("#startTime").datetimepicker('setStartDate', getDateLimit($("#workLogDate").val(),start));
        $("#startTime").datetimepicker('setEndDate', getDateLimit($("#workLogDate").val(),$("#endTime").val()!=""?$("#endTime").val():end));
    }).on('change', function () {
        $("#endTime").datetimepicker('setStartDate',getDateLimit($("#workLogDate").val(),$("#startTime").val()));
        vm.startTime = $("#startTime").val();
        if(vm.endTime!=""){
            vm.diffTime = getTimeDiff(vm.startTime,vm.endTime);
        }
    });
    $("#endTime").datetimepicker({
        format:'hh:ii',
        minView:0,
        startView:1,
        minuteStep:30
    }).on('show', function () {
        $("#endTime").datetimepicker('setStartDate', getDateLimit($("#workLogDate").val(),$("#startTime").val()!=""?$("#startTime").val():start));
        $("#endTime").datetimepicker('setEndDate', getDateLimit($("#workLogDate").val(),end));
    }).on('change', function () {
        $("#startTime").datetimepicker('setEndDate',getDateLimit($("#workLogDate").val(),$("#endTime").val()));
        vm.endTime = $("#endTime").val();
        vm.diffTime = getTimeDiff(vm.startTime,vm.endTime);
    });


    //初始化滚动条
    $(".center-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});

    $(window).resize(function() {
        vm.styleObject.height = ($(window).height()-45)+"px";
        $(".center-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}

function getGrid() {
    $.ajax({
        url: '../../projMan/workLog/getWorkLogList?_' + $.now(),
        data: JSON.stringify({
            "workLogDate" : vm.workLogDate,
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.workLogs = data;
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
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        styleObject:{height: ($(window).height()-45)+'px'},
        today: formatDate(new Date(),"yyyy-MM-dd"),
        workLogDate: formatDate(new Date(),"yyyy-MM-dd"),

        isAdd:false,
        isEdit:false,
        workLogs:[],
        startDate:"",
        endDate:"",


        startTime:"",
        endTime:"",
        diffTime:"",
        isProjectWork:true,
        project :1,
        task:1,
        workDetails:"",
        projects :[{text: "项目１", value: 1},{text: "项目2", value: 2},{text: "项目3", value: 3}],
        tasks:[{text: "任务１", value: 1},{text: "任务2", value: 2},{text: "任务3", value: 3}]



    },
    methods : {
        add: function() {
            vm.isAdd = !(vm.isAdd);
            if(vm.isAdd){

            }


        },
        save: function() {


            vm.isAdd = false;

        },
        edit: function() {
            vm.isEdit = !(vm.isEdit);
        },
        remove: function() {
        },
        plusDate: function(){
            var date = new Date(vm.workLogDate);
            date.setDate(date.getDate()+1);
            vm.workLogDate = formatDate(date,"yyyy-MM-dd");
            getGrid();
        },
        reducDate: function(){
            var date = new Date(vm.workLogDate);
            date.setDate(date.getDate()-1);
            vm.workLogDate = formatDate(date,"yyyy-MM-dd");
            getGrid();
        }
    }
    ,computed: {
        lastDay: function () {
            var date = new Date(this.workLogDate);
            date.setDate(date.getDate()-1);
            return formatDate(date,"yyyy-MM-dd");
        },
        nextDay: function () {
            var date = new Date(this.workLogDate);
            date.setDate(date.getDate()+1);
            return formatDate(date,"yyyy-MM-dd");
        },
        nextMonth: function () {
            var date = new Date(this.workLogDate);
            date.setDate(date.getDate()+1);
            return formatDate(date,"MM");
        }

    }


});







//获取日期界限，开始时间，结束时间
getDateLimit = function(dataStr,time){
    if(dataStr==""||time=="")return "";
    var data = new Date(dataStr);
    var year =data.getFullYear();
    var month = data.getMonth();
    var day = data.getDate();
    var hours = parseInt(time.split(':')[0],10);
    var getMinutes = parseInt(time.split(':')[1],10);
    return new Date(year,month,day,hours,getMinutes,0);
};
//获取时间差
getTimeDiff = function(startTimeStr,endTimeStr){
    if(startTimeStr==""||endTimeStr=="")return "";
    var hh=parseInt(endTimeStr.split(':')[0],10) - parseInt(startTimeStr.split(':')[0],10);
    var mm=parseInt(endTimeStr.split(':')[1],10) - parseInt(startTimeStr.split(':')[1],10);
    if(mm<0){
        hh-=1;
        mm=Math.abs(mm);
    }
    return hh+"小时"+mm+"分";
};

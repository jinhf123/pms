/**
 * 项目管理js
 */
var start = "8:00";
var end = "18:00";
$(function () {
    initialPage();
    getGrid();
    getWorkHoursGrid()
});

function initialPage() {
    //初始化日期框
    $("#workLogDate").datetimepicker().on('change', function () {
        vm.workLogDate = $("#workLogDate").val();
        getGrid();
    });
    $("#startDate").datetimepicker().on('hide', function () {
        vm.startDate = $("#startDate").val();
        getWorkHoursGrid();
        $("#endDate").datetimepicker('setStartDate',getDateLimit($("#startDate").val(),"00:00"));
    });
    $("#endDate").datetimepicker().on('hide', function () {
        vm.endDate = $("#endDate").val();
        getWorkHoursGrid();
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
            vm.minutes = getTimeDiff(vm.startTime,vm.endTime);
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
        vm.minutes = getTimeDiff(vm.startTime,vm.endTime);
    });


    //初始化滚动条
    $(".center-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(".right-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});


    $(window).resize(function() {
        vm.styleObject.height = ($(window).height()-45)+"px";
        $(".center-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        $(".right-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}

function getGrid() {
    $.ajax({
        url: '../../projMan/workLog/getWorkLogList?_' + $.now(),
        data: JSON.stringify({
            "workLogDate" : vm.workLogDate
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

function getWorkHoursGrid() {
    if(vm.startDate!==""&&vm.endDate!==""){
        $.ajax({
            url: '../../projMan/workLog/getWorkHoursList?_' + $.now(),
            data: JSON.stringify({
                "startDate" : vm.startDate,
                "endDate" : vm.endDate
            }),
            type: "post",
            dataType: "json",
            contentType: 'application/json',
            success: function (data) {
                vm.workHours = data;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                dialogLoading(false);
                dialogMsg(errorThrown, 'error');
            }
        });
    }
}






var vm = new Vue({
    el:'#dpLTE',
    data: {
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        styleObject:{height: ($(window).height()-45)+'px'},
        today: formatDate(new Date(),"yyyy-MM-dd"),
        workLogDate: formatDate(new Date(),"yyyy-MM-dd"),
        startDate:formatDate(new Date(),"yyyy-MM-dd"),
        endDate:formatDate(new Date(),"yyyy-MM-dd"),
        workLogs:[],
        workHours:[],
        isAdd:false,
        isEdit:false,

        //导出参数
        xlsStartDate:"2017-10-05",
        xlsEndDate:"2017-10-25",

        //新增保存参数
        workLogId:"",
        startTime:"",
        endTime:"",
        minutes:"",
        isProjectWork:1,
        project :"",
        task:"",
        workDetails:"",
        projects :[{text: "项目１", value: 1},{text: "项目2", value: 2},{text: "项目3", value: 3}],
        projTasks :[{text: "项目任务1", value: 1},{text: "项目任务2", value: 2},{text: "项目任务3", value: 3}],
        tasks:[{text: "任务１", value: 1},{text: "任务2", value: 2},{text: "任务3", value: 3}]
    },
    methods : {
        add: function() {
            if(vm.isAdd){return;}
            vm.isAdd = true;
            vm.isEdit = false;
            //清空输入内容
            vm.workLogId = "";
            vm.startTime = "";
            vm.endTime = "";
            vm.minutes = "";
            vm.isProjectWork = 1;
            vm.project  = "";
            vm.task = "";
            vm.workDetails = "";
        },
        save: function() {
            dialogLoading(true);
            $.ajax({
                url: '../../projMan/workLog/saveWorkLog?_' + $.now(),
                data: JSON.stringify({
                    "workLogId" : vm.workLogId,
                    "workLogDate" : vm.workLogDate,
                    "startTime" : vm.startTime,
                    "endTime" : vm.endTime,
                    "minutes" : vm.minutes,
                    "isProjectWork" : (vm.isProjectWork?"1":"0"),
                    "project" : vm.project,
                    "task" : vm.task,
                    "workDetails" : vm.workDetails
                }),
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                success: function () {
                    vm.isAdd = false;
                    vm.workLogId="";
                    vm.startTime="";
                    vm.endTime="";
                    vm.minutes="";
                    vm.isProjectWork=1;
                    vm.project="";
                    vm.task="";
                    vm.workDetails="";
                    getGrid();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    dialogLoading(false);
                    dialogMsg(errorThrown, 'error');
                }
            });
        },
        edit: function() {
            vm.isAdd = false;
            vm.isEdit = !(vm.isEdit);
            vm.workLogId = "";
        },
        startEdit:function(data){//开始编辑
            if(vm.isEdit){
                vm.workLogId = data.id;
                vm.startTime = data.startTime;
                vm.endTime = data.endTime;
                vm.minutes = data.minutes;
                vm.isProjectWork = (data.isProjectWork === 1);
                vm.project  = data.projId;
                vm.task = data.taskId;
                vm.workDetails = data.workDetails;
            }
            $("#startTime2").datetimepicker({
                format:'hh:ii',
                minView:0,
                startView: 1,
                minuteStep:30
            }).on('show', function () {
                $("#startTime2").datetimepicker('setStartDate', getDateLimit($("#workLogDate").val(),start));
                $("#startTime2").datetimepicker('setEndDate', getDateLimit($("#workLogDate").val(),$("#endTime2").val()!=""?$("#endTime2").val():end));
            }).on('change', function () {
                $("#endTime2").datetimepicker('setStartDate',getDateLimit($("#workLogDate").val(),$("#startTime2").val()));
                vm.startTime = $("#startTime2").val();
                if(vm.endTime!=""){
                    vm.minutes = getTimeDiff(vm.startTime,vm.endTime);
                }
            });
            $("#endTime2").datetimepicker({
                format:'hh:ii',
                minView:0,
                startView:1,
                minuteStep:30
            }).on('show', function () {
                $("#endTime2").datetimepicker('setStartDate', getDateLimit($("#workLogDate").val(),$("#startTime2").val()!=""?$("#startTime2").val():start));
                $("#endTime2").datetimepicker('setEndDate', getDateLimit($("#workLogDate").val(),end));
            }).on('change', function () {
                $("#startTime2").datetimepicker('setEndDate',getDateLimit($("#workLogDate").val(),$("#endTime2").val()));
                vm.endTime = $("#endTime2").val();
                vm.minutes = getTimeDiff(vm.startTime,vm.endTime);
            });
        },
        changeWorkLogType: function() {//是否项目任务 动作
            vm.task="";
        },
        plusDate: function(){//翻页动作，日期加一天
            var date = new Date(vm.workLogDate);
            date.setDate(date.getDate()+1);
            vm.workLogDate = formatDate(date,"yyyy-MM-dd");
            getGrid();
        },
        reducDate: function(){//翻页动作，日期减一天
            var date = new Date(vm.workLogDate);
            date.setDate(date.getDate()-1);
            vm.workLogDate = formatDate(date,"yyyy-MM-dd");
            getGrid();
        },
        exportExcel:function(){
            window.open("/projMan/workLog/exportExcel?startDate="+vm.xlsStartDate+"&endDate="+vm.xlsEndDate);
        }
    }
    ,computed: {
        lastDay: function () {//上一天日期
            var date = new Date(this.workLogDate);
            date.setDate(date.getDate()-1);
            return formatDate(date,"yyyy-MM-dd");
        },
        nextDay: function () {//下一天日期
            var date = new Date(this.workLogDate);
            date.setDate(date.getDate()+1);
            return formatDate(date,"yyyy-MM-dd");
        },
        nextMonth: function () {//下一天所在月份
            var date = new Date(this.workLogDate);
            date.setDate(date.getDate()+1);
            return formatDate(date,"MM");
        }

    }




});







//获取日期界限，开始时间，结束时间
getDateLimit = function(dataStr,time){
    if(dataStr===""||time==="")return "";
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
    if(startTimeStr===""||endTimeStr==="")return "";
    var h1 = parseInt(endTimeStr.split(':')[0],10);
    var h2 = parseInt(startTimeStr.split(':')[0],10);
    var mm = parseInt(endTimeStr.split(':')[1],10) - parseInt(startTimeStr.split(':')[1],10);
    var hh;
    if(h1>=14&&h2<=12){
        hh = h1 - h2 -2;
    }else if(12<=h1&&h1<=14&&h2<=12){
        hh = 12 - h2
    }else if(12<=h2&&h2<=14&&h1>=14){
        hh= h1-14
    }else{
        hh = h1 - h2;
    }
    return hh*60+mm;
};

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
    $('#workLogDate').datetimepicker().on('change', function () {
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

    getProjNameList();

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
    if (vm.startDate !== "" && vm.endDate !== "") {
        $.ajax({
            url: '../../projMan/workLog/getWorkHoursList?_' + $.now(),
            data: JSON.stringify({
                "startDate": vm.startDate,
                "endDate": vm.endDate
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

function initUpload(ctrlName, uploadUrl) {//上传控件初始化
    var control = $('#' + ctrlName);
    control.fileinput({
        theme: 'fa',
        language: 'zh', //设置语言
        uploadUrl: encodeURI(encodeURI(uploadUrl)), // 'http://localhost:8080/upload', //上传的地址
        overwriteInitial: false,
        maxFileSize: 1000*1000*20,
        maxFilesNum: 1,
        browseClass: 'btn btn-info', //按钮样式
        showPreview: false,
        uploadAsync: true,
        previewFileIcon: "<i class='glyphicon glyphicon-file'></i>",
        allowedFileExtensions: ["xls", "xlsx"], //接收的文件后缀
        maxFileCount: 1,//最大上传文件数限制
        previewFileIconSettings: {
            'docx': '<i class="fa fa-file-word-o text-primary"></i>',
            'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
            'xls': '<i class="fa fa-file-excel-o text-success"></i>',
            'pptx': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            'jpg': '<i class="fa fa-file-photo-o text-warning"></i>',
            'pdf': '<i class="fa fa-file-archive-o text-muted"></i>',
            'zip': '<i class="fa fa-file-archive-o text-muted"></i>'
        },
        validateInitialCount:true,
        msgPlaceholder: "请选择要导入的Excel文件...",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
    });

    // $("#excelFile").on("fileuploaded", function (event, data, previewId, index) { });
    //异步
    control.on('fileerror', function(event, data, msg) { //异步上传失败处理
        // console.log(data.index);
        // console.log(data.reader);
        // console.log(data.files.length);
        // console.log(data.filenames.length);
        console.log(msg);
        var obj = data.response;
        console.log(JSON.stringify(obj));
    });
    control.on("fileuploaded", function (event, data, previewId, index) {//异步上传成功处理
        if(data.response.success === true){
            dialogAlert(data.files[index].name + "导入成功!","info");
            //关闭
            layer.close(layer.index);//关闭弹窗
            getGrid();
            getWorkHoursGrid();
        }else{
            dialogAlert(data.files[index].name + "上传失败!" + data.response.message,"error");
            //重置
            // $("#excelFile").fileinput("clear");
            // $("#excelFile").fileinput("reset");
            // $('#excelFile').fileinput('refresh');
            // $('#excelFile').fileinput('enable');
        }
    });
}

//获取下拉框数据
function getProjNameList() {
    $.ajax({//获取项目及项目任务
        url: '/projMan/project/getTaskNameList2?_' + $.now(),
        data: JSON.stringify({}),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.projects = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
    $.ajax({//获取非项目任务
        url: '/projMan/project/getTaskNameList?_' + $.now(),
        data: JSON.stringify({
            "projId": 0
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.otherTasks = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
}



function initUpdateSelect(){
    $('.selectpicker').selectpicker('refresh');
    $('#project').on('changed.bs.select',function(){
        for (var i in vm.projects) {
            if(vm.project===vm.projects[i].value){
                vm.tasks = vm.projects[i].tasks;
                $('#task').selectpicker('refresh');
                break;
            }else{
                vm.tasks = [];
            }
        }
    });
    $('#project').on('hidden.bs.select',function(){
        $('#task').selectpicker('refresh');
    });

    //修改下拉框赋值
    $('#project').selectpicker('val',vm.project);
    $('#isProjectWork').selectpicker('val',vm.isProjectWork);
    $('#project').selectpicker('refresh');
    $('#isProjectWork').selectpicker('refresh');
    for (var i in vm.projects) {
        if(vm.project===vm.projects[i].value){
            vm.tasks = vm.projects[i].tasks;
            $('#task').selectpicker('refresh');
            break;
        }
    }
    setTimeout("$('#task').selectpicker('val',vm.task);$('#task').selectpicker('refresh');",200);
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
        xlsStartDate: formatDate(new Date(),"yyyy-MM-dd"),
        xlsEndDate: formatDate(new Date(),"yyyy-MM-dd"),
        //导入参数
        xlsPath:"",
        //下拉框数据
        projects :[],
        tasks :[],
        otherTasks:[],
        //保存参数
        workLogId:"",
        startTime:"",
        endTime:"",
        minutes:"",
        workDetails:"",
        isProjectWork:1,
        project :"",
        task:"",
        otherTask:""
    },
    methods : {
        add: function() {
            if(vm.isAdd){return;}
            vm.tasks = [];
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
            vm.otherTask = "";
            vm.workDetails = "";
            $('#projectAdd').selectpicker('val',null);
            $('#otherTaskAdd').selectpicker('val',null);
            $('#taskAdd').selectpicker('val',null);
            $('#projectAdd').selectpicker('refresh');
            $('#otherTaskAdd').selectpicker('refresh');
            setTimeout( "$('#taskAdd').selectpicker('refresh')",100);
        },
        save: function() {
            dialogLoading(true);
            var projId;
            var taskId;
            if(vm.isAdd){
                if(vm.isProjectWork===1){
                    projId = parseInt($('#projectAdd').val());
                    taskId = parseInt($('#taskAdd').val());
                }else{
                    projId = 0;//非项目标志
                    taskId = parseInt($('#otherTaskAdd').val());//非项目任务
                }
            }else{
                if(vm.isProjectWork==='1'){
                    projId = vm.project;
                    taskId = vm.task;
                }else{
                    projId = 0;//非项目标志
                    taskId = vm.otherTask;//非项目任务
                }
            }
            if(!taskId){
                dialogAlert("请选择任务！","warn")
                return;
            }
            // dialogAlert("project:"+projId+"\ttask:"+taskId);
            // if(1===1){return;}
            var params = {
                "workLogId" : vm.workLogId,
                "workLogDate" : vm.workLogDate,
                "startTime" : vm.startTime,
                "endTime" : vm.endTime,
                "minutes" : vm.minutes,
                "isProjectWork" : vm.isProjectWork,
                "project" : projId,
                "task" : taskId,
                "workDetails" : vm.workDetails
            };

            $.ajax({
                url: '../../projMan/workLog/saveWorkLog?_' + $.now(),
                data: JSON.stringify(params),
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
                    dialogLoading(false);
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
                vm.isProjectWork = data.isProjectWork;
                vm.project  = data.projId;
                vm.task = data.taskId;
                vm.workDetails = data.workDetails;

                /*$('.selectpicker').selectpicker('refresh');
                $('#project').selectpicker('val',vm.project);
                $('#isProjectWork').selectpicker('val',vm.isProjectWork);
                $('#project').selectpicker('refresh');
                $('#isProjectWork').selectpicker('refresh');
                for (var i in vm.projects) {
                    if(vm.project===vm.projects[i].value){
                        vm.tasks = vm.projects[i].tasks;
                        $('#task').selectpicker('refresh');
                        break;
                    }
                }*/
                // setTimeout("$('#task').selectpicker('val',vm.task);$('#task').selectpicker('refresh');",500);
                setTimeout("initUpdateSelect();",100);

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
            vm.isProjectWork = (vm.isProjectWork===1)?0:1;
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
            dialogContent2({
                title : "导出Excel",
                width : '600px',
                height : '200px',
                content :  $("#exportParamPanel"),
                btn : [ '确定', '取消' ],
                yes : function(index) {
                    //导出参数
                    if(isNullOrEmpty(vm.xlsStartDate)) {
                        dialogAlert('请选择开始日期！','info');
                        return false;
                    }
                    if(isNullOrEmpty(vm.xlsEndDate)) {
                        dialogAlert('请选择结束日期','info');
                        return false;
                    }
                    if(convertStringToDate(vm.xlsStartDate)>convertStringToDate(vm.xlsEndDate)) {
                        dialogAlert('开始日期不能大于结束日期！','info');
                        return false;
                    }
                    window.open("../../projMan/workLog/exportExcel?startDate="+vm.xlsStartDate+"&endDate="+vm.xlsEndDate);
                    layer.close(index);
                },
                success:function(){
                    $("#xlsStartDate").datetimepicker().on('hide', function () {
                        vm.xlsStartDate = $("#xlsStartDate").val();
                    });
                    $("#xlsEndDate").datetimepicker().on('hide', function () {
                        vm.xlsEndDate = $("#xlsEndDate").val();
                    });

                },
                end:function(){}
            });
        },
        importExcel:function(){
            dialogContent2({
                title : "导入Excel",
                width : '600px',
                height : '120px',
                content :  $("#importPanel"),
                btn : false,//[ '确定', '取消' ],
                success:function(){
                    initUpload("excelFile", "../../projMan/workLog/importExcel?startDate");
                },
                end:function(){
                    vm.xlsPath = "";
                }
            });
        }
    },
    computed: {
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

    },
    mounted: function () {
        $('#projectAdd').on('changed.bs.select',function(){
            for (var i in vm.projects) {
                if(parseInt($('#projectAdd').val())===vm.projects[i].value){
                    vm.tasks = vm.projects[i].tasks;
                    $('#taskAdd').selectpicker('refresh');
                    break;
                }else{
                    vm.tasks = [];
                }
            }
        });
        $('#projectAdd').on('hidden.bs.select',function(){
            $('#taskAdd').selectpicker('refresh');
        });
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

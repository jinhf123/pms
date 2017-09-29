/**
 * 项目管理js
 */

$(function () {
    initialPage();
    getProjectInfo();
    getStepList();
    var param = JSON.stringify({
        "projId":vm.projId,
        "stepId":vm.stepId
    });
    getTaskGrid(param);
    getScheGrid(param);
});


function initialPage() {
    //初始化滚动条
    $(".left-panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(".center-panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});


    $(".slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});

    //窗口大小改变重新调整大小
    $(window).resize(function() {
        vm.styleObj.height = ($(window).height()-55)+"px";
        $(".left-panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        $(".center-panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});

        $(".slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}

//获取项目信息
function getProjectInfo(){
    $.ajax({
        url: '../../projMan/projDetail/getProjectInfo?_' + $.now(),
        data: JSON.stringify({
            "projId" : vm.projId,
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.projectInfo = data;
        },
        error: function (xmlhttprequest, textstatus, errorthrown) {
            dialogloading(false);
            dialogmsg(errorthrown, 'error');
        }
    });
}
//获取项目步骤数据
function getStepList() {
    $.ajax({
        url: '../../projMan/projDetail/getStepList?_' + $.now(),
        data: JSON.stringify({
            "projId": vm.projId
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.steps = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
};

//获取任务数据列表
function getTaskGrid(param) {
    $.ajax({
        url: '../../projMan/projDetail/getTaskList?_' + $.now(),
        data: param,
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.tasks = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
};

//获取日程数据列表
function getScheGrid(param) {
    $.ajax({
        url: '../../projMan/projDetail/getScheduleList?_' + $.now(),
        data: param,
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.schedules = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
};

//保存任务
function saveTask(){
    console.log("保存任务");
};






var vm = new Vue({
    el:'#dpLTE',
    data: {
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        icon_Title : "/statics/img/projectManage/u15.png",
        icon_User : "/statics/img/projectManage/u16.png",
        icon_Date : "/statics/img/projectManage/u17.png",
        styleObj:{height: ($(window).height()-55)+'px'},
        isEdit:false,
        isAddTask:false,
        isAddSche:false,

        //项目信息
        projectInfo:{projectName:"",allStep:"",unCompStep:"",unCompTask:"",unCompSchedule:""},

        //查询参数
        projId:"1",
        stepId:"9",
        taskId:"",

        //新增任务参数
        taskTitle:"",
        taskStaff:"",
        taskEndDate:"",
        //新增日程参数
        content:"",
        participant:"",
        scheEndDate:"",

        steps:[],
            /*[
            {stepId:"1",stepName:"步骤1",stepOrder:"1", unCompleted:"13",allTask:"16",state:"2",unComNum:"0",total:"15"},
            {stepId:"2",stepName:"步骤2",stepOrder:"2", unCompleted:"12",allTask:"16",state:"2",unComNum:"0",total:"15"},
            {stepId:"3",stepName:"步骤3",stepOrder:"3", unCompleted:"11",allTask:"16",state:"2",unComNum:"0",total:"15"},
            {stepId:"4",stepName:"步骤4",stepOrder:"4", unCompleted:"10",allTask:"16",state:"2",unComNum:"0",total:"15"},
            {stepId:"5",stepName:"步骤5",stepOrder:"5", unCompleted:"9",allTask:"16",state:"2",unComNum:"0",total:"15"},
            {stepId:"6",stepName:"步骤6",stepOrder:"6", unCompleted:"8",allTask:"16",state:"1",unComNum:"10",total:"15"},
            {stepId:"7",stepName:"步骤7",stepOrder:"7", unCompleted:"7",allTask:"16",state:"0",unComNum:"15",total:"15"},
            {stepId:"8",stepName:"步骤8",stepOrder:"8", unCompleted:"6",allTask:"16",state:"0",unComNum:"15",total:"15"},
            {stepId:"9",stepName:"步骤9",stepOrder:"9", unCompleted:"5",allTask:"16",state:"0",unComNum:"15",total:"15"},
            {stepId:"10",stepName:"步骤10",stepOrder:"10", unCompleted:"4",allTask:"16",state:"0",unComNum:"15",total:"15"}
        ],*/
        tasks:[
            /*{taskId:"1",parentTask:"",taskTitle:"一级任务1",startDate:"09-22",taskStaff:"admin",rate:"100%",state:"2",expand:false ,
                subTask:[
                    {taskId:"3",parentTask:"",taskTitle:"二级任务1",startDate:"09-22",isTimeOut:true,taskStaff:"洪婕",rate:"100%",state:"2"},
                    {taskId:"4",parentTask:"",taskTitle:"二级任务2",startDate:"09-22",taskStaff:"洪婕",rate:"30%",state:"1"},
                    {taskId:"5",parentTask:"",taskTitle:"二级任务3",startDate:"09-22",taskStaff:"洪婕",rate:"30%",state:"1"}
                ]},
            {taskId:"2",parentTask:"",taskTitle:"一级任务2",startDate:"09-22",taskStaff:"测试",rate:"30%",state:"1",expand:false,
                subTask:[
                    {taskId:"6",parentTask:"",taskTitle:"二级任务1",startDate:"09-22",isTimeOut:true,taskStaff:"洪婕",rate:"0%",state:"0"},
                    {taskId:"7",parentTask:"",taskTitle:"二级任务2",startDate:"09-22",taskStaff:"洪婕",rate:"100%",state:"2"},
                    {taskId:"8",parentTask:"",taskTitle:"二级任务3",startDate:"09-22",taskStaff:"洪婕",rate:"0%",state:"0"}
                ]}*/
        ],
        schedules:[
            /*{date:"09-26",content:"由王辉组织集团ITSM监控小组制定如何帮忙他们提升监控部署效率的专项。",participant:"陈立、张三、李四、王五"},
            {date:"09-27",content:"最终目标仍然是把监控部署实施的工作降低下来。",participant:"陈立、李四、王五"},
            {date:"09-28",content:"最后能将这部分工作交给客户自己去做。",participant:"李四、王五"},
            {date:"09-29",content:"开例会。",participant:"李四、王五"}*/
        ]
    },
    methods : {
        load: function(id) {//加载列表
            this.stepId = id;
            var param = JSON.stringify({
                "projId":vm.projId,
                "stepId":vm.stepId,
                "taskId":vm.taskId
            });
            getTaskGrid(param);
            getScheGrid(param);
        },location: function(act){
            var url;
            if(act=="log"){
                url = "workLog.html";
            }
            window.location=url;
        },
        finishStage: function(id) {//完成本阶段
            alert("完成本阶段！"+id);
        },


        queryAllTask: function(){//查看所有任务
            var param = JSON.stringify({
                "projId":vm.projId,
                "stepId":"",
                "taskId":vm.taskId
            });
            getTaskGrid(param);
        },
        editTask: function(){//任务编辑
            this.isEdit=!this.isEdit;
            this.isAddTask=false;

        },
        startTask: function(id){
            alert("开始任务"+id);
        },
        finishTask: function(id,level){
            if(level==1){


            }

            alert("完成任务"+id);
        },
        delTask:function(id){
            alert("删除任务"+id);
        },
        addTaskPanel:function(){
            // alert("新增子任务");
            this.isAddTask=true;
        },
        addTask:function(){
            this.isAddTask=!this.isAddTask;
            saveTask();
        },
        closeTaskPanel:function () {
            this.isAddTask=!this.isAddTask;
        },


        queryAllSche: function(){//查看所有日程
            var param = JSON.stringify({
                "projId":vm.projId,
                "stepId":"",
                "taskId":vm.taskId
            });
            getScheGrid(param);
        },
        addSchePanel:function(){
            this.isAddSche=true;
        },
        addSche:function(){
            this.isAddSche=!this.isAddSche;
            saveTask();
        },
        closeSchePanel:function () {
            this.isAddSche=!this.isAddSche;
        }




    },
    computed: {

    }
});


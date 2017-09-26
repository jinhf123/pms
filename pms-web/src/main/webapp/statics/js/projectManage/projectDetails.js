/**
 * 项目管理js
 */

$(function () {
    initialPage();
    getProjectInfo();
    getGrid();
});


function initialPage() {
    //初始化滚动条
    $(".left-panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    // $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});

    //窗口大小改变重新调整大小
    $(window).resize(function() {
        vm.styleObj.height = ($(window).height()-45)+"px";
        $(".left-panel-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        // $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}

//获取项目信息
function getProjectInfo(){

}

//获取数据列表
function getGrid() {
    console.log("获取详情列表");
   /* $.ajax({
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
    });*/
}





var vm = new Vue({
    el:'#dpLTE',
    data: {
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        styleObj:{height: ($(window).height()-45)+'px'},
        isEdit:false,



        steps:[
            {stepName:"步骤1",stepOrder:"1", unCompleted:"13",allTask:"16",state:"2"},
            {stepName:"步骤2",stepOrder:"2", unCompleted:"12",allTask:"16",state:"2"},
            {stepName:"步骤3",stepOrder:"3", unCompleted:"11",allTask:"16",state:"2"},
            {stepName:"步骤4",stepOrder:"4", unCompleted:"10",allTask:"16",state:"2"},
            {stepName:"步骤5",stepOrder:"5", unCompleted:"9",allTask:"16",state:"2"},
            {stepName:"步骤6",stepOrder:"6", unCompleted:"8",allTask:"16",state:"1"},
            {stepName:"步骤7",stepOrder:"7", unCompleted:"7",allTask:"16",state:"0"},
            {stepName:"步骤8",stepOrder:"8", unCompleted:"6",allTask:"16",state:"0"},
            {stepName:"步骤9",stepOrder:"9", unCompleted:"5",allTask:"16",state:"0"},
            {stepName:"步骤10",stepOrder:"10", unCompleted:"4",allTask:"16",state:"0"}
        ],
        tasks:[
            {taskId:"1",parentTask:"",taskTitle:"一级任务1",startDate:"09-22",taskStaff:"admin",rate:"100%",state:"2",isExpand:false ,
                subTask:[
                    {taskId:"3",parentTask:"",taskTitle:"二级任务1",startDate:"09-22",isTimeOut:true,taskStaff:"洪婕",rate:"100%",state:"2"},
                    {taskId:"4",parentTask:"",taskTitle:"二级任务2",startDate:"09-22",taskStaff:"洪婕",rate:"30%",state:"1"},
                    {taskId:"5",parentTask:"",taskTitle:"二级任务3",startDate:"09-22",taskStaff:"洪婕",rate:"30%",state:"1"}
                ]},
            {taskId:"2",parentTask:"",taskTitle:"一级任务2",startDate:"09-22",taskStaff:"测试",rate:"30%",state:"1",isExpand:false,
                subTask:[
                    {taskId:"6",parentTask:"",taskTitle:"二级任务1",startDate:"09-22",isTimeOut:true,taskStaff:"洪婕",rate:"0%",state:"0"},
                    {taskId:"7",parentTask:"",taskTitle:"二级任务2",startDate:"09-22",taskStaff:"洪婕",rate:"100%",state:"2"},
                    {taskId:"8",parentTask:"",taskTitle:"二级任务3",startDate:"09-22",taskStaff:"洪婕",rate:"0%",state:"0"}
                ]}
        ],
        schedules:[
            {date:"09-26",content:"由王辉组织集团ITSM监控小组制定如何帮忙他们提升监控部署效率的专项。",participant:"陈立、张三、李四、王五"},
            {date:"09-27",content:"最终目标仍然是把监控部署实施的工作降低下来。",participant:"陈立、李四、王五"},
            {date:"09-28",content:"最后能将这部分工作交给客户自己去做。",participant:"李四、王五"},
            {date:"09-29",content:"开例会。",participant:"李四、王五"}
        ]

    },
    methods : {
        load: function() {
        },
        save: function() {
        },
        edit: function() {
        },
        editTask:function () {
            this.isEdit=!this.isEdit;
        },
        remove: function() {
        },
        location:function(act){
            var url;
            if(act=="log"){
                url = "workLog.html";
            }
            window.location=url;
        },
        stateIcon:function(state){
            if(state==0){
                return "";
            }
            if(state==1){
                return "";
            }
            if(state==2){
                return "";
            }

        }
    },
    computed: {

    }
});


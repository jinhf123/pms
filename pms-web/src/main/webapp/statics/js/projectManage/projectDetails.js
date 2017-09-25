/**
 * 项目管理js
 */

$(function () {
    initialPage();
    getGrid();
});


function initialPage() {
    //初始化滚动条
    // $(".type-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    // $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});

    //窗口大小改变重新调整大小
    $(window).resize(function() {
        vm.styleObj.height = ($(window).height()-45)+"px";
        // $(".type-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        // $(".project-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}

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
        steps:[
            {stepName:"步骤1",stepOrder:"1", unCompleted:"13",allTask:"16"},
            {stepName:"步骤2",stepOrder:"2", unCompleted:"12",allTask:"16"},
            {stepName:"步骤3",stepOrder:"3", unCompleted:"11",allTask:"16"},
            {stepName:"步骤4",stepOrder:"4", unCompleted:"10",allTask:"16"},
            {stepName:"步骤5",stepOrder:"5", unCompleted:"9",allTask:"16"},
            {stepName:"步骤6",stepOrder:"6", unCompleted:"8",allTask:"16"},
            {stepName:"步骤7",stepOrder:"7", unCompleted:"7",allTask:"16"},
            {stepName:"步骤8",stepOrder:"8", unCompleted:"6",allTask:"16"},
            {stepName:"步骤9",stepOrder:"9", unCompleted:"5",allTask:"16"},
            {stepName:"步骤10",stepOrder:"10", unCompleted:"4",allTask:"16"}
        ],
        tasks:[
            {taskId:"1",parentTask:"",taskTitle:"一级任务1",startDate:"09-22",taskStaff:"admin",rate:"100%",state:"2",isExpand:false ,
                subTask:[
                    {taskId:"3",parentTask:"",taskTitle:"二级任务1",startDate:"09-22",taskStaff:"洪婕",rate:"100%",state:"2"},
                    {taskId:"4",parentTask:"",taskTitle:"二级任务2",startDate:"09-22",taskStaff:"洪婕",rate:"30%",state:"1"},
                    {taskId:"5",parentTask:"",taskTitle:"二级任务3",startDate:"09-22",taskStaff:"洪婕",rate:"30%",state:"1"}
                ]},
            {taskId:"2",parentTask:"",taskTitle:"一级任务2",startDate:"09-22",taskStaff:"测试",rate:"30%",state:"1",isExpand:false,
                subTask:[
                    {taskId:"6",parentTask:"",taskTitle:"二级任务1",startDate:"09-22",taskStaff:"",rate:"0%",state:"0"},
                    {taskId:"7",parentTask:"",taskTitle:"二级任务2",startDate:"09-22",taskStaff:"",rate:"100%",state:"2"},
                    {taskId:"8",parentTask:"",taskTitle:"二级任务3",startDate:"09-22",taskStaff:"",rate:"0%",state:"0"}
                ]}
        ],
        schedule:[]

    },
    methods : {
        load: function() {
        },
        save: function() {
        },
        edit: function() {
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


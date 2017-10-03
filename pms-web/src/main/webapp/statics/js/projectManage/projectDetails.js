/**
 * 项目管理js
 */

$(function () {
    initialPage();
});

function initialPage(){
    //获取项目信息
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
        }
    });
}

var vm = new Vue({
    el:'#dpLTE',
    data: {
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        styleObj:{height: ($(window).height()-55)+'px'},
        projId:"1",
        projectInfo:{projectName:"",allStep:"",unCompStep:"",unCompTask:"",unCompSchedule:""}
    },
    methods : {
        load: function(id) {
        },location: function(act){
            var url;
            if(act=="log"){
                url = "workLog.html";
            }
            window.location=url;
        }
    },
    computed: {}
});


/**
 * 项目详情js
 */

$(function () {
    initialPage();
});

function initialPage(){
    if(getQueryString('projId')!=null)vm.projId = getQueryString('projId');
    $(window).resize(function() {
        vm.styleObj.height = ($(window).height()-50)+"px";
    });
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
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

var vm = new Vue({
    el:'#dpLTE',
    data: {
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        styleObj:{height: ($(window).height()-50)+'px'},
        projId:"",
        iframeSrc:"projInfo.html?projectID="+getQueryString('projId'),
        iframeId:"projectInfo",
        iframeName:"projectInfo",
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
        },
        selectTab:function (type) {
            switch (type){
                case 1:
                    vm.iframeSrc="projInfo.html?projId="+vm.projId;
                    vm.iframeId="projectInfo";
                    vm.iframeName="projectInfo";
                    break;
                case 2:
                    vm.iframeSrc="projProgress.html?projId="+vm.projId;
                    vm.iframeId="projProgress";
                    vm.iframeName="projProgress";
                    break;
                case 3:
                    vm.iframeSrc="developing.html?projId="+vm.projId;;
                    vm.iframeId="developing";
                    vm.iframeName="developing";
                    break;
                case 4:
                    vm.iframeSrc="projRiskIssue.html?projId="+vm.projId;;
                    vm.iframeId="projRiskIssue";
                    vm.iframeName="projRiskIssue";
                    break;
                case 5:
                    vm.iframeSrc="fileMan.html?projId="+vm.projId;
                    vm.iframeId="fileMan";
                    vm.iframeName="fileMan";
                    break;
            }
        },
        backToList: function(){
            toUrl('/projMan/projMan.html');
        }
    },
    computed: {}
});


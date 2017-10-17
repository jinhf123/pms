/**
 * 项目管理js
 */

$(function () {
    initialPage();
});

function initialPage(){
    if(getQueryString('projId')!=null)vm.projId = getQueryString('projId');
    debugger;
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
            debugger;
        }
    });
}

var vm = new Vue({
    el:'#dpLTE',
    data: {
        icon_Notice :"/statics/img/projectManage/u3.png",
        icon_Log    :"/statics/img/projectManage/u4.png",
        styleObj:{height: ($(window).height()-50)+'px'},
        projId:"1",//todo 开发时先默认为1


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
                    vm.iframeSrc="developing.html?projId="+vm.projId;;
                    vm.iframeId="developing";
                    vm.iframeName="developing";
                    break;
                case 5:
                    vm.iframeSrc="fileMan.html?projId="+vm.projId;
                    vm.iframeId="fileMan";
                    vm.iframeName="fileMan";
                    break;
            }
        }
    },
    computed: {}
});


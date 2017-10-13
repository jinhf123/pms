/**
 * 项目管理js
 */
$(function () {
    initialPage();
    getGrid();
});

function initialPage() {
    //初始化滚动条
    $(".north-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(".south-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});

    $(window).resize(function() {
        vm.styleObject.height = ($(window).height()-5)+"px";
        $(".north-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        $(".south-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}

function getGrid(){
    /*$.ajax({
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
    });*/
}

var vm = new Vue({
    el:'#dpLTE',
    data: {
        icon_dot :"/statics/img/projectManage/u20c.png",
        icon_Folder :"/statics/img/projectManage/u20.png",
        icon_File :"/statics/img/projectManage/u20_1.png",
        styleObject:{height: ($(window).height()-45)+'px'},
        addFolder:false,
        folders:[
            {"fileName":"列入计划"},{"fileName":"项目前期"},{"fileName":"科技立项"},
            {"fileName":"上传目录1"}, {"fileName":"上传目录2"}, {"fileName":"上传目录3"}, {"fileName":"上传目录4"},
            {"fileName":"上传目录5"}, {"fileName":"上传目录6"}, {"fileName":"上传目录7"}, {"fileName":"上传目录8"},
            {"fileName":"上传目录9"}, {"fileName":"上传目录10"}, {"fileName":"上传目录11"}, {"fileName":"上传目录12"}
            ],
        files:[]
    },
    methods : {
        addFolder: function() {

        },
        saveFolder: function() {
            dialogMsg("添加文件夹！！！", 'info');

            /*dialogLoading(true);
            $.ajax({
                url: '../../projMan/workLog/saveWorkLog?_' + $.now(),
                data: JSON.stringify({
                    "workLogId" : vm.workLogId,
                    "workDetails" : vm.workDetails
                }),
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    if(data.success){
                        dialogMsg("添加文件夹成功!"+data.msg, 'error');
                        getGrid();
                    }else{
                        dialogMsg("添加文件夹失败!"+data.msg, 'error');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    dialogLoading(false);
                    dialogMsg(errorThrown, 'error');
                }
            });*/
        },
        download: function() {
            dialogMsg("下载文件！！",'info')
        },
        deleteFolder: function(data){//删除目录
            dialogMsg("删除目录！！",'info');
            if(vm.isEdit){

            }
        }
    },
    computed: {
    }

});

/**
 * 项目管理js
 */
$(function () {
    initialPage();
    getFolderGrid();
});

function initialPage() {
    console.log("高度："+vm.styleObject.height);
    //初始化滚动条
    $(".north-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    $(".south-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});

    $(window).resize(function() {
        vm.styleObject.height = ($(window).height()-15)+"px";

        console.log("高度："+vm.styleObject.height);
        $(".north-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        $(".south-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
    });
}

//获取文件夹列表
function getFolderGrid(){
    $.ajax({
        url: '../../FileMan/getFileManList?_' + $.now(),
        data: JSON.stringify({
            "fileType" : "0"
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.folders = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
}

//获取文件列表
function getFileGrid(){
    $.ajax({
        url: '../../FileMan/getFileManList?_' + $.now(),
        data: JSON.stringify({
            "fileType" : "1",
            "folderId" : vm.activeFolderId
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.files = data;
            $(".south-slimScroll").slimScroll({height: 'auto', color: 'rgb(221, 221, 221)',size: '10px', distance: '2px',wheelStep :20});
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogLoading(false);
            dialogMsg(errorThrown, 'error');
        }
    });
}

//删除文档 或 删除文件夹
function deleteFileMan(){
    $.ajax({
        url: '../../FileMan/deleteFileMan?_' + $.now(),
        data: JSON.stringify({
            "fileId" : vm.deleteId
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.deleteId="";
            vm.load();
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
        icon_dot :"/statics/img/projectManage/u20c.png",
        icon_Folder :"/statics/img/projectManage/u20.png",
        icon_File :"/statics/img/projectManage/u20_1.png",
        styleObject:{height: ($(window).height()-15)+'px'},
        addFolder:false,
        //选中的文件夹
        activeFolderId:"",//"111",
        activeFolderName:"",//"列入计划",
        activeFolderDesc:"",//"本阶段需上传3个word文档，3个pdf。文档上传说明：xxxxxxxx",
        //要删除的文件id
        deleteId:null,
        //初始化数据
        folders:[
                // {"fileId":"111","fileName":"列入计划","describe":"本阶段需上传3个word文档，3个pdf。文档上传说明：xxxxxxxx"},
                // {"fileId":"112","fileName":"项目前期","describe":"本阶段需上传5个word文档，1个pdf。文档上传说明：xxxx"},
                // {"fileId":"113","fileName":"科技立项","describe":"本阶段需上传6个word文档，2个pdf。文档上传说明：xxx"},
                // {"fileId":"1","fileName":"上传目录1","describe":"文档上传说明：xxxxxxxx1"},
                // {"fileId":"2","fileName":"上传目录2","describe":"文档上传说明：xxxxxxxx2"},
                // {"fileId":"3","fileName":"上传目录3","describe":"文档上传说明：xxxxxxxx3"},
                // {"fileId":"4","fileName":"上传目录4","describe":"文档上传说明：xxxxxxxx4"},
                // {"fileId":"5","fileName":"上传目录5","describe":"文档上传说明：xxxxxxxx5"},
                // {"fileId":"6","fileName":"上传目录6","describe":"文档上传说明：xxxxxxxx6"},
                // {"fileId":"7","fileName":"上传目录7","describe":"文档上传说明：xxxxxxxx7"},
                // {"fileId":"8","fileName":"上传目录8","describe":"文档上传说明：xxxxxxxx8"},
                // {"fileId":"9","fileName":"上传目录9","describe":"文档上传说明：xxxxxxxx9"},
                // {"fileId":"10","fileName":"上传目录10","describe":"文档上传说明：xxxxxxxx10"},
                // {"fileId":"11","fileName":"上传目录11","describe":"文档上传说明：xxxxxxxx11"},
                // {"fileId":"12","fileName":"上传目录12","describe":"文档上传说明：xxxxxxxx12"}
            ],
        files:[
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档1","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档2","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档3","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档4","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档5","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档6","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档7","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档8","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档9","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档10","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档11","staffName":"张三","createDate":"2017-04-22 16:00:00"},
            // {"fileType":"1","fileName":"2016EDW系统项目建议书文档12","staffName":"张三","createDate":"2017-04-22 16:00:00"}
        ]
    },
    methods : {
        load:function(){
            getFolderGrid();
            if(vm.activeFolderId!="")getFileGrid();
        },
        activeFolder:function(folder){
            vm.activeFolderId = folder.fileId;
            vm.activeFolderName = folder.fileName;
            vm.activeFolderDesc = folder.describe;
            getFileGrid();
        },
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
                        getFolderGrid();
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
        deleteFolder: function(){//删除目录
            dialogConfirm("请确认是否删除该文件夹?",function(){
                vm.deleteId = vm.activeFolderId;
                deleteFileMan();
                getFolderGrid();
            });
        },
        download: function(fileId) {
            dialogMsg("下载文件！！"+fileId,'info')
        },
        deletefile: function(fileId){//删除文件
            dialogConfirm("请确认是否删除该文件?",function(){
                vm.deleteId = fileId;
                deleteFileMan();
                getFileGrid();
            });
        }
    },
    computed: {
    }

});

/**
 * 项目管理js
 */
$(function () {
    initialPage();
    getFolderGrid();
});

function initialPage() {
    if(getQueryString('projId')!==null)vm.projId = getQueryString('projId');
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
        url: '../FileMan/getFolderList?_' + $.now(),
        data: JSON.stringify({
            "projId" : vm.projId
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
        url: '../FileMan/getFileManList?_' + $.now(),
        data: JSON.stringify({
            "projId" : vm.projId,
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
        url: '../FileMan/deleteFileMan?_' + $.now(),
        data: JSON.stringify({
            "fileId" : vm.deleteId
        }),
        type: "post",
        dataType: "json",
        contentType: 'application/json',
        success: function () {
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
        icon_dot :"../statics/img/projectManage/u20c.png",
        icon_Folder :"../statics/img/projectManage/u20.png",
        icon_File :"../statics/img/projectManage/u20_1.png",
        styleObject:{height: ($(window).height()-15)+'px'},
        projId:"",
        //添加文件夹参数
        folderName:"",
        description:"",
        //选中的文件夹
        activeFolderId:"",//"111",
        activeFolderName:"",//"列入计划",
        activeFolderDesc:"",//"本阶段需上传3个word文档，3个pdf。文档上传说明：xxxxxxxx",
        //要删除的文件id
        deleteId:null,
        //初始化数据
        folders:[],
        files:[]
    },
    methods : {
        load:function(){
            getFolderGrid();
            if(vm.activeFolderId!=="")getFileGrid();
        },
        activeFolder:function(folder){
            vm.activeFolderId = folder.fileId;
            vm.activeFolderName = folder.fileName;
            vm.activeFolderDesc = folder.description;
            getFileGrid();
        },
        addFolder: function() {
            dialogContent2({
                title : "添加文件夹",
                width : '420px',
                height : '200px',
                content :  $("#addFolderLayer"),
                btn : [ '确定', '取消' ],
                yes : function(index) {
                    if(isNullOrEmpty(vm.folderName)) {
                        dialogMsg('文件夹名称为空！');
                        return false;
                    }
                    $.ajax({
                        url: '../FileMan/addFolderInfo?_' + $.now(),
                        data: JSON.stringify({
                            "projId" : vm.projId,
                            "folderName" : vm.folderName,
                            "description": vm.description
                        }),
                        type: "post",
                        dataType: "json",
                        contentType: 'application/json',
                        success: function (data) {
                            if(data.success){
                                layer.close(index);
                                dialogMsg("添加文件夹成功!", 'info');
                                getFolderGrid();
                            }else{
                                dialogAlert("添加文件夹失败!"+data.msg, 'error');
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            dialogLoading(false);
                            dialogAlert(errorThrown, 'error');
                        }
                    });
                }
            });
        },
        upload:function(){
            dialogOpen({
                id: 'staffSelect',
                title: '文件上传',
                url: '/base/util/upload.html?projId=' + vm.projId + '&folderId='+vm.activeFolderId+'&folderName=' + vm.activeFolderName,
                scroll : true,
                width: "600px",
                height: "420px",
                btn: false,
                end: function() {
                    getFileGrid();
                }
            });
        },
        deleteFolder: function(){//删除目录
            dialogConfirm("请确认是否删除该文件夹?",function(index){
                vm.deleteId = vm.activeFolderId;
                deleteFileMan();
                top.layer.close(index);//关闭弹窗
                vm.activeFolderId = "";
                vm.activeFolderName = "";
                vm.activeFolderDesc = "";
                getFolderGrid();
            });
        },
        download: function(fileId) {
            window.open("/download?fileId="+fileId);
        },
        deletefile: function(fileId){//删除文件
            dialogConfirm("请确认是否删除该文件?",function(index){
                vm.deleteId = fileId;
                deleteFileMan();
                top.layer.close(index);//关闭弹窗
                getFileGrid();
            });
        }
    },
    computed: {
    }

});

/**
 * 项目风险问题管理js
 */

$(function () {
    initialPage();
    getGrid();
});

function initialPage() {
    $(window).resize(function() {
        $('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
    });
}

function getGrid() {


    // $('#dataGrid').bootstrapTable({
    //     height:$(window).height()-54,
    //     url: '../../projMan/project/list?_' + $.now(),
    //     dataField: "rows",
    //     method: 'post',
    //     dataType: 'json',
    //     selectItemName: 'id',
    //     clickToSelect: true,
    //     pagination: false,//不分页
    //     smartDisplay: false,
    //     // queryParamsType : null,
    //     queryParams: function(params){
    //         params.projName = vm.keyword;
    //         console.log("查询参数："+params.projName);
    //         return params;
    //     },
    //     columns: [{
    //         checkbox: true
    //     }, {
    //         field : "projId",
    //         title : "项目编号",
    //         align : "center",
    //         width : "100px"
    //     }, {
    //         field : "projName",
    //         title : "项目名称",
    //         align : "center",
    //         width : "300px"
    //     }, {
    //         field : "projType",
    //         title : "项目类型",
    //         align : "center",
    //         width : "100px"
    //     }, {
    //         field : "startDate",
    //         title : "开始日期",
    //         align : "center",
    //         width : "200px",
    //         formatter: function(item, index){
    //             return formatDate(item,"yyyy年MM月dd日");
    //         }
    //     }, {
    //         field : "endDate",
    //         title : "结束日期",
    //         align : "center",
    //         width : "200px",
    //         formatter: function(item, index){
    //             return formatDate(item,"yyyy/MM/dd");
    //         }
    //     }]
    // });



}

var vm = new Vue({
    el:'#dpLTE',
    data: {
        icon_Add: "/statics/img/projectManage/u2.png",
        param:{
            proposeStaff:"",//提出人
            onChargeStaff:"",//负责人
            state:"0",//状态，默认未选中
            startDate:"",
            endDate:""
        }

    },
    methods : {
        load: function(){
            // $('#dataGrid').bootstrapTable('refresh');
        },
        save: function(){
            dialogOpen({
                title: '新增项目',
                url: 'projMan/add.html?_' + $.now(),
                width: '420px',
                height: '320px',
                yes : function(iframeId) {
                    // top.frames[iframeId].vm.acceptClick();
                }
            });
        },
        edit: function() {
            // var ck = $('#dataGrid').bootstrapTable('getSelections');
            // if(checkedRow(ck)){
            //     dialogOpen({
            //         title: '编辑项目',
            //         url: 'projMan/edit.html?_' + $.now(),
            //         width: '420px',
            //         height: '320px',
            //         success: function(iframeId){
            //             top.frames[iframeId].vm.role.roleId = ck[0].roleId;
            //             top.frames[iframeId].vm.setForm();
            //         },
            //         yes: function(iframeId){
            //             top.frames[iframeId].vm.acceptClick();
            //         }
            //     });
            // }
        },
        remove: function() {
        }
    }
})
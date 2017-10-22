/**
 * 项目风险问题管理js
 */

$(function () {
    initialPage();
    getGrid();
});

function initialPage() {
    vm.projId = getQueryString('projId');
    $(window).resize(function() {
        $('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
    });
    $("#startDate").datetimepicker().on('change', function () {
        vm.param.startDate = $("#startDate").val();
    });
    $("#endDate").datetimepicker().on('change', function () {
        vm.param.endDate = $("#endDate").val();
    });
}

function getGrid() {
    $('#dataGrid').bootstrapTableEx({
        url: '../../riskIssue/projRisk/list?_' + $.now(),
        height: $(window).height()-54,
        queryParams: function(params){
            params.projId = vm.projId;
            params.proposeStaff = vm.param.proposeStaff;//提出人
            params.onChargeStaff = vm.param.onChargeStaff;//负责人
            params.state = vm.param.state;//状态，默认未选中
            params.startDate = vm.param.startDate;//开始时间
            params.endDate = vm.param.endDate;//结束时间
            params.keyWord = vm.param.keyWord;//关键字
            return params;
        },
        columns: [{
            field : "riskId",
            title : "风险问题编号",
            visible : false
        },{
            field : "projId",
            title : "项目编号",
            visible : false
        }, {
            field : "proposeDate",
            title : "提出时间",
            align : "center",
            width : "100px",
            formatter: function(value){
                return formatDate(value,'yyyy-MM-dd')
            }
        },{
            field : "proposeStaff",
            title : "提出人",
            visible : false
        },{
            field : "proposeName",
            title : "提出人",
            align : "center",
            width : "80px"
        },{
            field : "content",
            title : "风险内容",
            align : "center",
            width : "250px"
        },{
            field : "state",
            title : "是否解决",
            align : "center",
            width : "50px",
            formatter: function(value){
                if(value==='0'){
                    return "否";
                }else{
                    return "是";
                }
            }
        },{
            field : "onChargeStaff",
            title : "负责人",
            visible : false
        },{
            field : "onChargeName",
            title : "负责人",
            align : "center",
            width : "80px"
        },{
            field : "resolventDate",
            title : "计划解决时间",
            align : "center",
            width : "100px",
            formatter: function(value){
                return formatDate(value,'yyyy-MM-dd')
            }
        },{
            field : "realResoDate",
            title : "实际解决时间",
            align : "center",
            width : "100px",
            formatter: function(value){
                return formatDate(value,'yyyy-MM-dd')
            }
        },{
            field : "resolvent",
            title : "解决方式",
            align : "center",
            width : "250px",
            formatter: function(value){
                debugger;
                return value===null?"":value;
            }
        },{
            field : "userId",
            title : "操作",
            align : "center",
            width : "50px",
            formatter: function(value,row){//value,row,index
                if(row.proposeStaff===value||row.onChargeStaff===value){
                    vm.selectRow = row;
                    return "<button class='btn btn-sm btn-link' onClick='operate()'><span>操作</span></button>"
                }else{
                    return "";
                }
            }
        }]
    });
}


function operate(){
    alert(vm.selectRow.riskId);
}



var vm = new Vue({
    el:'#dpLTE',
    catch:false,
    data: {
        icon_Search :"/statics/img/projectManage/u1.png",
        icon_Add: "/statics/img/projectManage/u2.png",
        projId:"",
        selectRow:{},
        param:{
            proposeStaff:"",//提出人
            proposeName:"",//提出人名称
            onChargeStaff:"",//负责人
            onChargeName:"",//负责人名称
            state:"0",//状态，默认未选中
            startDate:formatDate(new Date(),"yyyy-MM-dd"),
            endDate:formatDate(new Date(),"yyyy-MM-dd"),
            keyWord:""
        }
    },
    methods : {
        load: function(){
            debugger;
            var opt = {
                url: '../../riskIssue/projRisk/list?_' + $.now(),
                silent: true, //刷新事件必须设置
                height: $(window).height()-54,
                queryParams: function(params){
                    params.projId = vm.projId;
                    params.proposeStaff = vm.param.proposeStaff;//提出人
                    params.onChargeStaff = vm.param.onChargeStaff;//负责人
                    params.state = vm.param.state;//状态，默认未选中
                    params.startDate = vm.param.startDate;//开始时间
                    params.endDate = vm.param.endDate;//结束时间
                    params.keyWord = vm.param.keyWord;//关键字
                    return params;
                }
            };
            $('#dataGrid').bootstrapTableEx('refresh');
            $('#dataGrid').bootstrapTable('refresh');
            // $('#dataGrid').bootstrapTableEx('reload');
        },
        selectStaff:function(id){
            dialogOpen({
                id: 'staffSelect',
                title: '人员选择',
                url: 'base/user/staff.html?singleSelect=true',
                scroll : true,
                width: "600px",
                height: "600px",
                yes : function(iframeId) {
                    var vmObj = window.vm;
                    var userId=top.frames[iframeId].vm.userId;
                    var userName =  top.frames[iframeId].vm.userName;
                    if(id==='proposeName'){
                        vmObj.param.proposeStaff = userId;
                        vmObj.param.proposeName=userName;
                    }else if(id==='onChargeName'){
                        vmObj.param.onChargeStaff = userId;
                        vmObj.param.onChargeName=userName;
                    }
                    top.layer.close(top.layer.getFrameIndex(iframeId));//先得到当前iframe层的索引再执行关闭
                }
            })
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
        },
        delPropose: function(){
            vm.param.proposeName='';
            vm.param.proposeStaff='';
        },
        delOnCharge: function (){
            vm.param.onChargeName='';
            vm.param.onChargeStaff=''
        }
    }
});
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
                return value===null?"":value;
            }
        },{
            field : "userId",
            title : "操作",
            align : "center",
            width : "50px",
            formatter: function(value,row,index){//value,row,index
                if(row.proposeStaff===value||row.onChargeStaff===value){
                    return "<button class='btn btn-sm btn-link' onClick='operate("+index+")'><span>操作</span></button>"
                }else{
                    return "";
                }
            }
        }]
    });
}


function operate(index){//操作
    debugger;
    var data = $('#dataGrid').bootstrapTable('getData')[index];
    vm.isOperate = true;
    dialogContent2({
        title : "操作",
        width : '800px',
        height : '420px',
        content :  $("#addPanel"),
        btn: false,
        success: function(){
            vm.riskId = data.riskId;//风险问题编号
            vm.content = data.content;//风险内容
            vm.remark = data.remark;//备注
            vm.proposeDate = data.proposeDate;//提出时间
            vm.resolventDate = data.resolventDate;//解决时间
            vm.proposeStaff = data.proposeStaff;//提出人
            vm.proposeName = data.proposeName;//提出人名称
            vm.onChargeStaff = data.onChargeStaff;//负责人
            vm.onChargeName = data.onChargeName;//负责人名称
            vm.resolvent = data.resolvent;//解决方法
        }
    });
}

function addRiskIssue(){//新增风险问题
    vm.isOperate = false;
    dialogContent2({
        title : "新增风险问题",
        width : '800px',
        height : '300px',
        content :  $("#addPanel"),
        success: function(){
            var now = new Date();
            now.setDate(now.getDate()+7);
            $("#resolventDate").datetimepicker().on('change', function () {
                vm.resolventDate = $("#resolventDate").val();
            });
            vm.riskId = "";//风险问题编号
            vm.content = "";//风险内容
            vm.remark = "";//备注
            vm.resolventDate = formatDate(now,"yyyy-MM-dd");//解决时间
            vm.onChargeStaff = "";//负责人
            vm.onChargeName = "";//负责人名称
        },
        btn: false
    });
}




var vm;
vm = new Vue({
    el: '#dpLTE',
    catch: false,
    data: {
        icon_Search: "/statics/img/projectManage/u1.png",
        icon_Add: "/statics/img/projectManage/u2.png",
        projId: "",
        isOperate: true,
        selectRow: {},
        param: {
            proposeStaff: "",//提出人
            proposeName: "",//提出人名称
            onChargeStaff: "",//负责人
            onChargeName: "",//负责人名称
            state: "0",//状态，默认未选中
            endDate: formatDate(new Date(), "yyyy-MM-dd"),
            startDate: formatDate(new Date(), "yyyy-MM-dd"),
            keyWord: ""
        },
        riskId: "",//风险问题编号
        content: "",//风险内容
        remark: "",//备注
        proposeDate: "",//提出时间
        resolventDate: "",//解决时间
        proposeStaff: "",//提出人
        proposeName: "",//提出人名称
        onChargeStaff: "",//负责人
        onChargeName: "",//负责人名称
        resolvent: ""//解决方法
    },
    methods: {
        load: function () {
            $('#dataGrid').bootstrapTable('refresh');
        },
        query:function(){
            if(convertStringToDate(vm.param.endDate) < convertStringToDate(vm.param.startDate)){
                dialogAlert("开始时间不能大于结束时间！","warn");
                return ;
            }
            vm.load();
        },
        selectStaff:function(id){
            if(id==='onCharge'&&vm.isOperate){//操作时责任人不可选
                return;
            }
            dialogOpen({
                id: 'staffSelect',
                title: '人员选择',
                url: 'base/user/staff.html?singleSelect=true',
                scroll : true,
                width: "600px",
                height: "600px",
                yes : function(iframeId) {
                    var userId=top.frames[iframeId].vm.userId;
                    var userName = top.frames[iframeId].vm.userName;
                    if(id==='proposeName'){//查询 提出人字段
                        window.vm.param.proposeStaff = userId;
                        window.vm.param.proposeName=userName;
                    }else if(id==='onChargeName'){//查询 责任人字段
                        window.vm.param.onChargeStaff = userId;
                        window.vm.param.onChargeName = userName;
                    }else if(id==='onCharge'){//保存 责任人字段
                        window.vm.onChargeStaff = userId;
                        window.vm.onChargeName = userName;
                    }
                    top.layer.close(top.layer.getFrameIndex(iframeId));//先得到当前iframe层的索引再执行关闭
                }
            })
        },
        save: function () {

            if(vm.isOperate){//操作
                if(vm.resolvent===''){
                    dialogAlert("解决方法不能为空！","warn");
                    return;
                }
            }else{//添加

                if(vm.content===''){
                    dialogAlert("风险内容不能为空！","warn");
                    return;
                }
                if(vm.resolventDate===''){
                    dialogAlert("解决时间不能为空！","warn");
                    return;
                }
                if(vm.onChargeStaff===''){
                    dialogAlert("负责人不能为空！","warn");
                    return;
                }
            }


            $.ajax({
                url: '../../riskIssue/projRisk/saveRiskIssue',
                data: JSON.stringify({
                    "projId":vm.projId,
                    "riskId":vm.riskId,//风险问题编号
                    "content":vm.content,//风险内容
                    "remark":vm.remark,//备注
                    "proposeDate":vm.proposeDate,//提出时间
                    "resolventDate":vm.resolventDate,//解决时间
                    "proposeStaff":vm.proposeStaff,//提出人
                    "proposeName":vm.proposeName,//提出人名称
                    "onChargeStaff":vm.onChargeStaff,//负责人
                    "onChargeName":vm.onChargeName,//负责人名称
                    "resolvent":vm.resolvent//解决方法
                }),
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    if(data.success){
                        dialogMsg("保存成功！");
                        layer.close(layer.index);//执行关闭
                        vm.load();
                    }else{
                        dialogMsg("保存失败！"+data.msg,"error")
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    dialogLoading(false);
                    dialogMsg(errorThrown, 'error');
                }
            });
        },
        edit: function () {

        },
        remove: function () {

        },
        close:function(){
            layer.close(layer.index);//执行关闭
        }
    }
});

function delPropose(){
    vm.param.proposeName='';
    vm.param.proposeStaff='';
}
function delOnCharge(){
    debugger;
    vm.param.onChargeName='';
    vm.param.onChargeStaff=''
}


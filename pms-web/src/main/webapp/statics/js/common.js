// 获取请求参数
// 使用示例：
// location.href = http://localhost:8080/index.html?id=123
// T.p('id') --> 123;
var url = function(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}

//全局配置
$.ajaxSetup({
	dataType: "json",
	cache: false,
	complete:function(XMLHttpRequest,textStatus){
		if(textStatus=="parsererror"){
           console.log("登陆超时！请重新登陆！");
       } else if(textStatus=="error"){
           console.log("请求超时！请稍后再试！");
       }
//		var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
//		if(sessionstatus=="timeout"){
//			top.layer.open({
//			  title: '系统提示',
//			  area: '338px',
//			  icon: 3,
//			  move: false,
//			  anim: -1,
//			  isOutAnim: false,
//			  content: '注：登录超时,请稍后重新登录.',
//			  btn: ['立即退出'],
//			  btnAlign: 'c',
//			  yes: function(){
//				  toUrl('/user/logout');
//			  }
//			});
//			setTimeout(function(){
//				toUrl("/user/timeout");
//			}, 2000);
//		}     
	}
})

//权限判断
function hasPermission(permission) {
    if(isNullOrEmpty(window.parent.perms)) {
    	return false;
    }
	if (window.parent.perms.indexOf(permission) > -1) {
        return true;
    } else {
        return false;
    }
}


/** 跳转到URL
*
*  使用示例：
*  toUrl('sys/logout?_' + $.now());
**/
toUrl = function(href) {
	window.location.href = href;
}


/** 带分页栏的DataGrid
*
*  使用示例：
*  $('#dataGrid').bootstrapTableEx({
*       height: $(window).height()-54,
*       url: '../../sys/role/list?_' + $.now(),
*       queryParams: function(params){
*           params.roleName = vm.keyword;
*           return params;
*       },
*       columns: [{
*           checkbox: true
*       }, {
*           field : "id",
*           title : "编号",
*           width : "50px"
*       }, {
*           field : "Name",
*           title : "名称",
*           width : "200px"
*       }]
* })
**/
$.fn.bootstrapTableEx = function(opt){
	var defaults = {
		url: '',
		dataField: "rows",
		method: 'post',
		dataType: 'json',
		selectItemName: 'id',
		clickToSelect: true,
		pagination: true,
		smartDisplay: false,
		pageSize: 10,
		pageList: [10, 20, 30, 40, 50],
		paginationPreText: '上一页',
		paginationNextText: '下一页',
		sidePagination: 'server',
		queryParamsType : null,
		columns: []
	}
	var option = $.extend({}, defaults, opt);
	$(this).bootstrapTable(option);
}




/*
符号	意义
p	12小时制且小写(‘am’ or ‘pm’)
P	12小时制且大写(‘AM’ or ‘PM’)
s	秒，前面不补0
ss	秒，前面补0
i	分，前面不补0
ii	分，前面补0
h	时，24小时制，前面不补0
hh	时，24小时制，前面补0
H	时，12小时制，前面不补0
HH	时，12小时制，前面补0
d	日，前面不补0
dd	日，前面补0
m	月，数字表示，前面不补0 如：4
mm	月，数字表示，前面补0 如：04
M	月，缩写表示，前面补0 如：Apr
MM	月，全称表示，前面补0 如：April
yy	年，后两位 如：16
yyyy	年，全部 如：2016
*/
//全局设置日期选择插件的参数.
$.fn.datetimepicker.defaults = {
    language:  'zh-CN',
    format:'yyyy-mm-dd',
    autoclose:true,//自动关闭
    minView:2,//最精准的时间选择为日期:0-分 1-时 2-日 3-月 4-年
	weekStart:0,//一周从哪一天开始: 0（星期日）到6（星期六）
    // maxView:4,//最高能展示的时间 0-分 1-时 2-日 3-月 4-年
    // minuteStep:5, //步进值,此数值被当做步进值用于构建小时视图。就是最小的视图是每5分钟可选一次。是以分钟为单位的。
    // startDate: 1900-01-01,//开始日期
    // endDate: 2200-01-01,//结束日期
    // daysOfWeekDisabled: [0,4,6],//一周的周几不能选 0（星期日）到6（星期六） 可以有多个。
    // pickerPosition:bottom-right, //选择框位置 默认值：’bottom-right’ 还支持 : ‘bottom-left’，’top-right’，’top-left’
    // initialDate：new Date()//在打开时默认选当时的时间，显示在View中





};



/** 格式化日期
 *  使用示例：
 *  formatDate(item,"yyyy-MM-dd")
 **/
formatDate = function (v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3),
        "S": d.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

isNullOrEmpty = function (obj) {
    if ((typeof (obj) == "string" && obj == "") || obj == null || obj == undefined) {
        return true;
    } else {
        return false;
    }
}

isNotNullOrEmpty = function (obj) {
    if ((typeof (obj) == "string" && obj == "") || obj == null || obj == undefined) {
        return false;
    } else {
        return true;
    }
}

checkedArray = function (id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        dialogMsg('您没有选中任何数据项！');
    }
    return isOK;
}

checkedRow = function (id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        dialogMsg('您没有选中任何数据项！');
    } else if (id.length > 1) {
        isOK = false;
        dialogMsg('您只能选择一条数据项！');
    }
    return isOK;
}

reload = function () {
    location.reload();
    return false;
}

dialogOpen = function(opt){
	var defaults = {
		id : 'layerForm',
		title : '',
		width: '',
		height: '',
		url : null,
		scroll : false,
		data : {},
		btn: ['确定', '取消'],
		success: function(){},
		yes: function(){}
	}
	var option = $.extend({}, defaults, opt), content = null;
	if(option.scroll){
		content = [option.url]
	}else{
		content = [option.url, 'no']
	}
	top.layer.open({
	  	type : 2,
	  	id : option.id,
		title : option.title,
		closeBtn : 1,
		anim: -1,
		isOutAnim: false,
		shadeClose : false,
		shade : 0.3,
		area : [option.width, option.height],
		content : content,
		btn: option.btn,
		success: function(){
			option.success(option.id);
		},
		yes: function(){
			option.yes(option.id);
		}
    });
}

dialogContent = function(opt){
	var defaults = {
		title : '系统窗口',
		width: '',
		height: '',
		content : null,
		data : {},
		btn: ['确定', '取消'],
		success: null,
		yes: null
	}
	var option = $.extend({}, defaults, opt);
	return top.layer.open({
	  	type : 1,
		title : option.title,
		closeBtn : 1,
		anim: -1,
		isOutAnim: false,
		shadeClose : false,
		shade : 0.3,
		area : [option.width, option.height],
		shift : 5,
		content : option.content,
		btn: option.btn,
		success: option.success,
		yes: option.yes
    });
}

dialogAjax = function(opt){
	var defaults = {
		title : '系统窗口',
		width: '',
		height: '',
		url : null,
		data : {},
		btn: ['确定', '取消'],
		success: null,
		yes: null
	}
	var option = $.extend({}, defaults, opt);
	$.post(option.url, null, function(content){
		layer.open({
		  	type : 1,
			title : option.title,
			closeBtn : 1,
			anim: -1,
			isOutAnim: false,
			shadeClose : false,
			shade : 0.3,
			area : [option.width, option.height],
			shift : 5,
			content : content,
			btn: option.btn,
			success: option.success,
			yes: option.yes
	    });
	});
}

dialogAlert = function (content, type) {
	var msgType = {
		success:1,
		error:2,
		warn:3,
		info:7
	};
	if(isNullOrEmpty(type)){
		type='info';
	}
	top.layer.alert(content, {
        icon: msgType[type],
        title: "系统提示",
        anim: -1,
        btnAlign: 'c',
		isOutAnim: false
    });
}

dialogConfirm = function (content, callBack) {
	top.layer.confirm(content, {
		area: '338px',
		icon: 7,
        anim: -1,
		isOutAnim: false,
        title: "系统提示",
        btn: ['确认', '取消'],
        btnAlign: 'c',
    	yes: callBack
    });
}

dialogMsg = function(msg, type) {
	var msgType = {
		success:1,
		error:2,
		warn:3,
		info:7
	};
	if(isNullOrEmpty(type)){
		type='info';
	}
	top.layer.msg(msg, {
		icon: msgType[type],
		time: 2000
	}); 
}

dialogClose = function() {
	var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	top.layer.close(index); //再执行关闭 
}

dialogLoading = function(flag) {
	if(flag){
		top.layer.load(0, {
			shade: [0.1,'#fff'],
			time: 2000
		});
	}else{
		top.layer.closeAll('loading');
	}
}

$.fn.GetWebControls = function (keyValue) {
    var reVal = "";
    $(this).find('input,select,textarea').each(function (r) {
        var id = $(this).attr('id');
        var type = $(this).attr('type');
        switch (type) {
            case "checkbox":
                if ($("#" + id).is(":checked")) {
                    reVal += '"' + id + '"' + ':' + '"1",'
                } else {
                    reVal += '"' + id + '"' + ':' + '"0",'
                }
                break;
            default:
                var value = $("#" + id).val();
                if (value == "") {
                    value = "&nbsp;";
                }
                reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",'
                break;
        }
    });
    reVal = reVal.substr(0, reVal.length - 1);
    if (!keyValue) {
        reVal = reVal.replace(/&nbsp;/g, '');
    }
    reVal = reVal.replace(/\\/g, '\\\\');
    reVal = reVal.replace(/\n/g, '\\n');
    var postdata = jQuery.parseJSON('{' + reVal + '}');
    return postdata;
};

$.fn.SetWebControls = function (data) {
    var $id = $(this)
    for (var key in data) {
        var id = $id.find('#' + key);
        if (id.attr('id')) {
            var type = id.attr('type');
            var value = $.trim(data[key]).replace(/&nbsp;/g, '');
            switch (type) {
                case "checkbox":
                    if (value == 1) {
                        id.attr("checked", 'checked');
                    } else {
                        id.removeAttr("checked");
                    }
                    break;
                default:
                    id.val(value);
                    break;
            }
        }
    }
}

$.currentIframe = function () {
    return $(window.parent.document).contents().find('#main')[0].contentWindow;;
}
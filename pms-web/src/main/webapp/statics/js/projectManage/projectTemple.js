$(document).ready(function () {
    $('.js-example-basic-multiple').select2();
});

var templeForm = {
    template: "                                <div>\n" +
    "                                    <div class=\"flex-container\">\n" +
    "                                        <div class=\"flex-left\">\n" +
    "                                            <label for=\"inlineFormCustomSelect\">默认完成时间：上一环节偏移</label>\n" +
    "                                            <input class=\"custom-control input-number\" type=\"text\"/>\n" +
    "                                            <select class=\"custom-select input-number\" id=\"inlineFormCustomSelect\">\n" +
    "                                                <option value=\"1\" selected>月</option>\n" +
    "                                                <option value=\"2\">天</option>\n" +
    "                                            </select>\n" +
    "                                            <label class=\"\">当离完成时间</label>\n" +
    "                                            <input class=\"custom-control input-number\" type=\"text\"/>\n" +
    "                                            <label class=\"\">天,通知给</label>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"flex-right\">\n" +
    "                                            <select class=\"js-example-basic-multiple form-control\" name=\"states[]\"\n" +
    "                                                    multiple=\"multiple\">\n" +
    "                                                <option value=\"AL\">Alabama</option>\n" +
    "                                                <option value=\"WY\">Wyoming</option>\n" +
    "                                            </select>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-line\">\n" +
    "                                        <div class=\"flex-container\">\n" +
    "                                            <div class=\"flex-left\">\n" +
    "                                                <label>当任务变更时，默认通知给</label>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"flex-right\">\n" +
    "                                                <select class=\"js-example-basic-multiple form-control\" name=\"states[]\"\n" +
    "                                                        multiple=\"multiple\">\n" +
    "                                                    <option value=\"AL\">Alabama</option>\n" +
    "                                                    <option value=\"WY\">Wyoming</option>\n" +
    "                                                </select>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-line\">\n" +
    "                                        <label>当日程结束前</label>\n" +
    "                                        <input type=\"text\" class=\"custom-control input-number\"/>\n" +
    "                                        <label>天，通知给参与人</label>\n" +
    "                                    </div>\n" +
    "                                    <div>\n" +
    "                                        <div class=\"flex-container\">\n" +
    "                                            <div class=\"flex-left flex-checkbox\">\n" +
    "                                                <input type=\"checkbox\" class=\"\"/>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"flex-right\">\n" +
    "                                                <div class=\"form-line\">\n" +
    "                                                    <label>本环节需要上传文档 对上传文档要求</label>\n" +
    "                                                    <input type=\"checkbox\" class=\"custom-control\"/>\n" +
    "                                                    <label> word</label>\n" +
    "                                                    <input type=\"text\" class=\"custom-control input-number\"\n" +
    "                                                           placeholder=\"个数\"/>\n" +
    "                                                    <input type=\"checkbox\" class=\"custom-control\"/>\n" +
    "                                                    <label> xls</label>\n" +
    "                                                    <input type=\"text\" class=\"custom-control input-number\"\n" +
    "                                                           placeholder=\"个数\"/>\n" +
    "                                                    <input type=\"checkbox\" class=\"custom-control\"/>\n" +
    "                                                    <label> pdf</label>\n" +
    "                                                    <input type=\"text\" class=\"custom-control input-number\"\n" +
    "                                                           placeholder=\"个数\"/>\n" +
    "                                                </div>\n" +
    "                                                <input type=\"text\" class=\"form-control\" placeholder=\" 对上传的文档进行具体说明\">\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>"
};

var stepLi = {
    template: "                            <li>\n" +
    "                                <img class=\"badge-notify\" onclick=\"deleteStep(this)\"\n" +
    "                                     src=\"/statics/img/step_delete.png\"/>\n" +
    "                                <a href=\"#messages-pills\" data-toggle=\"tab\" title=\"科技立项\" ondblclick=\"changeStepName(this)\">科技立项</a>\n" +
    "                            </li>"
}

var vm = new Vue({
    el: '#dpTemple',
    data: {},
    components: {
        "temple-form": templeForm,
        "step-li": stepLi
    },
    methods: {}
});

function deleteStep(obj) {
    var li = $(obj).parent();
    var href = li.find('a').attr('href');
    var content = $(href);
    // if (li.parent().find("li").length <= 1) {
    //     alert("必须存在一个")
    // }
    if (li.hasClass("active")) {
        if (content.next().length !== 0) {
            li.next().addClass("active");
            content.next().addClass("active in");
        } else {
            li.prev().addClass("active");
            content.prev().addClass("active in");
        }

    }
    li.remove();
    content.remove();
}

function changeStepName(obj) {
    var val = $(obj).text();
    $(obj).html("<input onblur='changeText(this);' style='color: black; width: 56px' />");
    var input = $(obj).find("input");
    input.focus().val("").val(val);
    input.get(0).scrollLeft = input.get(0).scrollWidth;
}

function changeText(obj) {
    var a = $(obj).parent();
    a.attr("title", $(obj).val());
    a.html($(obj).val());
}

function addNewStep(obj) {
    $(obj).parent().before("<step-li></step-li>");
}
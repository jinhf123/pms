$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
});

var templeForm = {
    template: ""+
    "               <div class=\"form-group row\">\n" +
    "                <label class=\"col-sm-2 col-form-label\">默认完成时间：上一环节偏移</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" placeholder=\"输入模板名称\">\n" +
    "                </div>\n" +
    "            </div>"
};

var vm = new Vue({
    el: '#dpTemple',
    data: {},
    components: {
        "temple-form": templeForm,
    },
    methods: {}
})
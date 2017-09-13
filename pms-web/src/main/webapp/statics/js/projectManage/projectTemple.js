var templeForm = {
    template: ""+
    "               <div class=\"form-group row\">\n" +
    "                <label class=\"col-sm-2 col-form-label\">模板名称：</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" placeholder=\"输入模板名称\">\n" +
    "                </div>\n" +
    "            </div>"
};
var Child = {
    template: '<h1>自定义组件!</h1>'
};

var vm = new Vue({
    el: '#dpTemple',
    data: {},
    components: {
        "tf": templeForm,
        "Child":Child
    },
    methods: {}
})
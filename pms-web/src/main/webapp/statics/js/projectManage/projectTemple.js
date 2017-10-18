Vue.component('v-select', VueSelect.VueSelect);
var templeStepForm = {
    props: [
        'item',
        'options'
    ],
    template: "#templateStepForm"
};
var templateStepList = {
    props: [
        'item',
        'options'
    ],
    template: "#templateStepList"
};

var templeForm = {
    props: ['temp', 'options'],
    template: "#templateForm",
    components: {
        "template-step-form": templeStepForm
    },
    methods: {
        addNewStep: function () {
            this.temp.stepList.push({
                stepName: '双击修改',
                status: "show",
                stepSort: null,
                defaultMoveDate: null,
                finishNoticeDate: null,
                noticeStaff: null,
                noticeStaffId: null,
                taskChangeStaff: null,
                taskChangeStaffId: null,
                finishScheduleNoticeDate: null,
                finishScheduleStaff: null,
                isAttach: null,
                attachWord: 0,
                attachExcel: 0,
                attachPdf: 0,
                attachContent: null
            });
            console.log(this.temp);
        },
        removeStep: function (index) {
            this.temp.stepList.splice(index, 1);
        },
        show: function (index) {
            this.temp.stepList[index].status = "show";
        },
        edit: function (index) {
            this.temp.stepList[index].status = "edit";
        },
        submitForm: function () {
            var me = this;
            this.$http.post(
                "/projMan/template",
                {
                    params: {
                        tempName: this.temp.tempName,
                        description: this.temp.description,
                        stepList: this.temp.stepList
                    }
                }).then(function (data) {
                top.layer.open({
                    title: '添加结束',
                    area: '338px',
                    anim: -1,
                    isOutAnim: false,
                    move: false,
                    closeBtn: 0,
                    content: '添加成功',
                    btn: ['确定'],
                    yes: function () {
                        me.$emit("submit-success");
                        top.layer.close(top.layer.index);
                    }
                });
            }, function (err) {
                top.layer.open({
                    title: '系统提示',
                    area: '338px',
                    icon: 3,
                    anim: -1,
                    isOutAnim: false,
                    move: false,
                    content: '发生错误,重新加载?',
                    btn: ['确定', '取消'],
                    btnAlign: 'c',
                    yes: function () {
                        dialogLoading(true);
                        setTimeout(function () {
                            toUrl('index.html#projMan/projectTemple.html?');
                        }, 500);
                    }
                });
            });
        }
    }
};
var templeList = {
    props: ['template', 'options', 'temp'],
    template: "#templateList",
    components: {
        "template-step-list": templateStepList
    },
    created: function () {
        console.log(this.template);
    }
};

const routes = [
    {
        path: '/',
        redirect: '/bar/0'
    },
    {
        path: '/foo',
        component: templeForm
    },
    {
        path: '/bar/:index',
        component: templeList
    }
];

const router = new VueRouter({
    routes: routes
});

var vm = new Vue({
    el: '#dpTemple',
    router: router,
    data: {
        isLoading: null,
        template: [],
        temp: {
            tempName: null,
            description: null,
            is_default: null,
            stepList: [
                {
                    stepName: '列入计划',
                    status: "show",
                    stepSort: null,
                    defaultMoveDate: null,
                    finishNoticeDate: null,
                    noticeStaff: null,
                    noticeStaffId: null,
                    taskChangeStaff: null,
                    taskChangeStaffId: null,
                    finishScheduleNoticeDate: null,
                    finishScheduleStaff: null,
                    isAttach: null,
                    attachWord: null,
                    attachExcel: null,
                    attachPdf: null,
                    attachContent: null
                }
            ]
        },
        options: ['foo', 'bar', 'baz'],
    },
    components: {
        "template-form":
        templeForm
    },

    methods: {
        resetData: function () {
            this.temp.tempName = null;
            this.temp.description = null;
            this.temp.stepList = [
                {
                    stepName: '列入计划',
                    status: "show",
                    stepSort: null,
                    defaultMoveDate: null,
                    finishNoticeDate: null,
                    noticeStaff: null,
                    noticeStaffId: null,
                    taskChangeStaff: null,
                    taskChangeStaffId: null,
                    finishScheduleNoticeDate: null,
                    finishScheduleStaff: null,
                    isAttach: null,
                    attachWord: 0,
                    attachExcel: 0,
                    attachPdf: 0,
                    attachContent: null
                }
            ]
        },
        loadTemplate: function () {
            var me = this;
            me.isLoading = true;
            this.$http.get("/projMan/template")
                .then(function (data) {
                    me.isLoading = false;
                    me.template = data.data;
                }, function (err) {
                    console.log(err);
                })
        },
        reloadTemplate: function () {
            this.loadTemplate();
            this.resetData();
        },
        setDefault: function (tempId) {
            var self = this;
            this.$http.post("/projMan/template/setDefault", tempId)
                .then(function (data) {
                    var title;
                    if (data.data.success) {
                        title = "设置成功";
                    } else {
                        title = "设置失败";
                    }
                    top.layer.open({
                        title: title,
                        area: '338px',
                        anim: -1,
                        isOutAnim: false,
                        move: false,
                        closeBtn: 0,
                        content: data.data.message,
                        btn: ['确定'],
                        yes: function () {
                            self.loadTemplate();
                            top.layer.close(top.layer.index);
                        }
                    });
                }, function (err) {
                    console.log(err)
                })
        }
    },
    created: function () {
        this.loadTemplate();
    }
});

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
});
Vue.component('v-select', VueSelect.VueSelect);
const config = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
};
// Vue.use(VeeValidate);
Vue.use(VeeValidate, config);
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
    data: function () {
        return {
            stepActive: 0,
            stepStart: 0,
            stepWidth: 600,
            stepCount: 0
        }
    },
    methods: {
        toPrev: function () {
            this.stepStart--;
        },
        toNext: function () {
            this.stepStart++;
        },
        setActive: function (index) {
            this.stepActive = index;
            $('.nav-step li:eq(' + (index - this.stepStart) + ') a').tab('show');
        },
        addNewStep: function () {
            this.temp.stepList.push({
                stepName: '双击修改',
                status: "edit",
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
            if (this.temp.stepList.length - this.stepStart > this.stepCount)
                this.stepStart++;
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
            // this.$validator.validateAll().then(function (result) {
            //     console.log(result);
            //     if (result) {
            //         alert('From Submitted!');
            //         return;
            //     }
            //
            //     alert('Correct them errors!');
            // });

            this.$http.post(
                "/projMan/template",
                {
                    params: {
                        tempName: this.temp.tempName,
                        description: this.temp.description,
                        stepList: this.temp.stepList
                    }
                }).then(function (data) {
                var title;
                if (data.data.success) {
                    title = "添加成功";
                } else {
                    title = "添加失败";
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
    }, watch: {
        stepWidth: function (val) {
            var a = Math.floor((val - 100 - 2 - 40 - 102) / 122) + 1;
            this.stepCount = a;
        }
    },
    mounted: function () {
        this.stepWidth = this.$refs.step.clientWidth;
        const that = this;
        window.onresize = function () {
            that.stepWidth = that.$refs.step.clientWidth;
        };
    }
};
var templeList = {
    props: ['template', 'options', 'temp'],
    template: "#templateList",
    data: function () {
        return {
            stepActive: 0,
            stepStart: 0,
            stepWidth: 600,
            stepCount: 0
        }
    },
    watch: {
        stepWidth: function (val) {
            var a = Math.floor((val - 100 - 2 - 20) / 122) + 1;
            console.log(a);
            this.stepCount = a;
        }
    },
    components: {
        "template-step-list": templateStepList
    },
    mounted: function () {
        this.stepWidth = document.getElementById('nav-step').clientWidth;
        const that = this;
        window.onresize = function () {
            that.stepWidth = document.getElementById('nav-step').clientWidth;
        };
    },
    methods: {
        getCss: function () {
            console.log(this.stepCount);
            console.log(this);
        },
        toPrev: function () {
            this.stepStart--;
        },
        toNext: function () {
            this.stepStart++;
        },
        setActive: function (index) {
            this.stepActive = index;
            $('#nav-step li:eq(' + (index - this.stepStart) + ') a').tab('show');
        }
    }

};

const routes = [
    {
        path: '/',
        // redirect: '/template/0',
        redirect: 'addTemplate'
    },
    {
        path: '/addTemplate',
        component: templeForm
    },
    {
        path: '/template/:index',
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
    },
    watch: {
        template: function (val, oldVal) {
            console.log(oldVal);
            if (oldVal.length < val.length && oldVal.length !== 0) {
                this.$nextTick(function () {
                    var container = this.$el.querySelector(".template-nav");
                    container.scrollTop = container.scrollHeight;
                    this.$router.push({path: '/template/' + (val.length - 1)})
                })
            }
        }
    }
});

Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
        el.select();
    }
});

// Vue.directive('click-outside', {
//     bind: function (el, binding, vnode) {
//         el.event = function (event) {
//             // here I check that click was outside the el and his childrens
//             if (!(el == event.target || el.contains(event.target))) {
//                 // and if it did, call method provided in attribute value
//                 vnode.context[binding.expression](event);
//             }
//         };
//         document.body.addEventListener('click', el.event)
//     },
//     unbind: function (el) {
//         document.body.removeEventListener('click', el.event)
//     }
// });
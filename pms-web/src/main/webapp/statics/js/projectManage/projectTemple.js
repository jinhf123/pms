Vue.component('v-select', VueSelect.VueSelect);
Vue.use(VueNumeric.default);
const config = {
    errorBagName: 'errors',
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
};

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
    props: ['options', 'template', 'templateinfo'],
    template: "#templateForm",
    components: {
        "template-step-form": templeStepForm
    },
    data: function () {
        return {
            type: "add",
            templateInfo: [],
            deleteStep: [],
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
            this.templateInfo.projTemplateStepEntities.push({
                stepName: '双击修改',
                status: "edit",
                dayMonth: 30,
                stepSort: null,
                defaultMove: null,
                defaultMoveDate: null,
                finishNoticeDate: null,
                noticeStaffArray: [],
                noticeStaff: null,
                noticeStaffId: null,
                taskChangeStaffArray: [],
                taskChangeStaff: null,
                taskChangeStaffId: null,
                finishScheduleNoticeDate: null,
                finishScheduleStaff: null,
                attach: false,
                isAttach: null,
                attachWord: 0,
                attachExcel: 0,
                attachPdf: 0,
                attachContent: null
            });
            if (this.templateInfo.projTemplateStepEntities.length - this.stepStart > this.stepCount)
                this.stepStart++;
        },
        removeStep: function (index) {

            if (typeof this.templateInfo.projTemplateStepEntities[index].tempStepId !== "undefined") {
                this.deleteStep.push(this.templateInfo.projTemplateStepEntities[index].tempStepId);
            }
            this.templateInfo.projTemplateStepEntities.splice(index, 1);

        },
        show: function (index) {
            var step = JSON.parse(JSON.stringify(this.templateInfo.projTemplateStepEntities[index]));
            step.status = "show";
            Vue.set(this.templateInfo.projTemplateStepEntities, index, step);
        },
        edit: function (index) {
            var step = JSON.parse(JSON.stringify(this.templateInfo.projTemplateStepEntities[index]));
            step.status = "edit";
            Vue.set(this.templateInfo.projTemplateStepEntities, index, step);
        },
        setProject: function () {
            for (var i in this.templateInfo.projTemplateStepEntities) {
                this.templateInfo.projTemplateStepEntities[i].defaultMoveDate = parseInt(this.templateInfo.projTemplateStepEntities[i].defaultMove) * parseInt(this.templateInfo.projTemplateStepEntities[i].dayMonth);
                if (this.templateInfo.projTemplateStepEntities[i].attach === true) {
                    this.templateInfo.projTemplateStepEntities[i].isAttach = "1";
                } else {
                    this.templateInfo.projTemplateStepEntities[i].isAttach = "0";
                }

                var label = [];
                var value = [];
                for (var j in this.templateInfo.projTemplateStepEntities[i].taskChangeStaffArray) {
                    label.push(this.templateInfo.projTemplateStepEntities[i].taskChangeStaffArray[j].label);
                    value.push(this.templateInfo.projTemplateStepEntities[i].taskChangeStaffArray[j].value);
                }
                this.templateInfo.projTemplateStepEntities[i].taskChangeStaffId = value.join();
                this.templateInfo.projTemplateStepEntities[i].taskChangeStaff = label.join();

                label = [];
                value = [];
                for (var j in this.templateInfo.projTemplateStepEntities[i].noticeStaffArray) {
                    label.push(this.templateInfo.projTemplateStepEntities[i].noticeStaffArray[j].label);
                    value.push(this.templateInfo.projTemplateStepEntities[i].noticeStaffArray[j].value);
                }
                this.templateInfo.projTemplateStepEntities[i].noticeStaffId = value.join();
                this.templateInfo.projTemplateStepEntities[i].noticeStaff = label.join();
            }
        },
        getProject: function () {
            if (this.type === "add") {
                this.templateInfo = {
                    tempName: null,
                    description: null,
                    is_default: null,
                    projTemplateStepEntities: [
                        {
                            stepName: '列入计划',
                            status: "show",
                            stepSort: null,
                            dayMonth: 30,
                            defaultMove: null,
                            defaultMoveDate: null,
                            finishNoticeDate: null,
                            noticeStaffArray: [],
                            noticeStaff: null,
                            noticeStaffId: null,
                            taskChangeStaffArray: [],
                            taskChangeStaff: null,
                            taskChangeStaffId: null,
                            finishScheduleNoticeDate: null,
                            finishScheduleStaff: null,
                            attach: false,
                            isAttach: null,
                            attachWord: null,
                            attachExcel: null,
                            attachPdf: null,
                            attachContent: null
                        }
                    ]
                };
            } else if (this.type === "edit") {
                var templateInfo = this.template[this.$route.params.index];
                for (var i in templateInfo.projTemplateStepEntities) {
                    var isAttach = templateInfo.projTemplateStepEntities[i].isAttach;
                    var defaultMoveDate = parseInt(templateInfo.projTemplateStepEntities[i].defaultMoveDate);
                    var noticeStaffId = templateInfo.projTemplateStepEntities[i].noticeStaffId;
                    var taskChangeStaffId = templateInfo.projTemplateStepEntities[i].taskChangeStaffId;
                    var j, value, exists;
                    templateInfo.projTemplateStepEntities[i].attach = false;
                    templateInfo.projTemplateStepEntities[i].noticeStaffArray = [];
                    templateInfo.projTemplateStepEntities[i].taskChangeStaffArray = [];
                    templateInfo.projTemplateStepEntities[i].dayMonth = 1;
                    templateInfo.projTemplateStepEntities[i].defaultMove = defaultMoveDate;
                    templateInfo.projTemplateStepEntities[i].status = "show";
                    if (isAttach === "1") {
                        templateInfo.projTemplateStepEntities[i].attach = true;
                    }

                    if (defaultMoveDate % 30 === 0) {
                        templateInfo.projTemplateStepEntities[i].dayMonth = 30;
                        templateInfo.projTemplateStepEntities[i].defaultMove = defaultMoveDate / 30;
                    }

                    var noticeStaffArray = [];
                    if (noticeStaffId !== null) {
                        noticeStaffArray = noticeStaffId.split(",");
                    }
                    for (j in noticeStaffArray) {
                        value = noticeStaffArray[j];
                        exists = this.options.map(function (x) {
                            return x.value;
                        }).indexOf(value);
                        if (exists !== -1) {
                            templateInfo.projTemplateStepEntities[i].noticeStaffArray.push(this.options[exists]);
                        }
                    }
                    var taskChangeStaffArray = [];
                    if (taskChangeStaffId !== null) {
                        taskChangeStaffArray = taskChangeStaffId.split(",");
                    }
                    for (j in taskChangeStaffArray) {
                        value = taskChangeStaffArray[j];
                        exists = this.options.map(function (x) {
                            return x.value;
                        }).indexOf(value);
                        if (exists !== -1) {
                            templateInfo.projTemplateStepEntities[i].taskChangeStaffArray.push(this.options[exists]);
                        }
                    }
                }
                this.templateInfo = JSON.parse(JSON.stringify(templateInfo));
            }
        },
        submitForm: function () {
            var me = this;
            this.$validator.validateAll().then(function (result) {
                if (result) {
                    me.setProject();
                    var params = {};
                    var url = "";
                    if (me.type === "add") {
                        url = "/projMan/template";
                        params = {
                            tempName: me.templateInfo.tempName,
                            description: me.templateInfo.description,
                            projTemplateStepEntities: me.templateInfo.projTemplateStepEntities
                        };
                    } else if (me.type === "edit") {
                        url = "/projMan/template/update";
                        params = {
                            tempId: me.templateInfo.tempId,
                            tempName: me.templateInfo.tempName,
                            description: me.templateInfo.description,
                            projTemplateStepEntities: me.templateInfo.projTemplateStepEntities,
                            deleteStep: me.deleteStep
                        };
                    } else {
                        return;
                    }
                    console.log(params);
                    me.$http.post(url, params).then(function (data) {
                        var title;
                        if (data.data.success) {
                            if (me.type === "add") {
                                title = "添加成功";
                            } else {
                                title = "修改成功";
                            }

                        } else {
                            if (me.type === "add") {
                                title = "添加失败";
                            } else {
                                title = "修改失败";
                            }
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

            });

        }
    }, watch: {
        stepWidth: function (val) {
            this.stepCount = Math.floor((val - 100 - 2 - 40 - 102) / 122) + 1;
        }
    },
    created: function () {
        if (typeof this.$route.params.type !== "undefined") {
            this.type = this.$route.params.type
        }
        this.getProject();
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
        redirect: '/template/add'
    },
    {
        path: '/template/:type',
        component: templeForm
    },
    {
        path: '/template/:type/:index',
        component: templeForm
    }
];

const router = new VueRouter({
    routes: routes
});

var vm = new Vue({
    el: '#dpTemple',
    router: router,
    data: {
        templateinfo: [],
        isLoading: null,
        template: [],
        templateNoticeUser: []
    },
    components: {
        "template-form":
        templeForm
    },

    methods: {
        resetData: function () {
            this.temp.tempName = null;
            this.temp.description = null;
            this.temp.projTemplateStepEntities = [
                {
                    stepName: '列入计划',
                    status: "show",
                    stepSort: null,
                    dayMonth: 30,
                    defaultMove: null,
                    defaultMoveDate: null,
                    finishNoticeDate: null,
                    noticeStaffArray: [],
                    noticeStaff: null,
                    noticeStaffId: null,
                    taskChangeStaffArray: [],
                    taskChangeStaff: null,
                    taskChangeStaffId: null,
                    finishScheduleNoticeDate: null,
                    finishScheduleStaff: null,
                    attach: false,
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
            //this.resetData();
        },
        deleteTemplate: function (tempId) {
            var self = this;
            top.layer.open({
                title: "警告",
                area: '338px',
                anim: -1,
                isOutAnim: false,
                move: false,
                content: "确认删除该模板吗",
                btn: ['确定', '取消'],
                yes: function () {
                    self.$http.post("/projMan/template/delete", tempId)
                        .then(function (data) {
                            top.layer.close(top.layer.index);
                            var title;
                            if (data.data.success) {
                                title = "删除成功";
                            } else {
                                title = "删除失败";
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
            });
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
        },
        loadMacro: function () {
            var self = this;
            this.$http.post("/sys/macro/getMacroByCatalog", {"typeCodes": ['templateNoticeUser']})
                .then(function (data) {
                    if ("templateNoticeUser" in data.data) {
                        for (var i in data.data["templateNoticeUser"]) {
                            self.templateNoticeUser.push({
                                label: data.data["templateNoticeUser"][i]["name"],
                                value: data.data["templateNoticeUser"][i]["value"]
                            });
                        }
                    }
                }, function (err) {
                    console.log(err);
                });
        }
    },
    mounted: function () {
        this.loadTemplate();
        this.loadMacro();
    },
    watch: {
        template: function (val, oldVal) {
            if (oldVal.length < val.length && oldVal.length !== 0) {
                this.$nextTick(function () {
                    var container = this.$el.querySelector(".template-nav");
                    container.scrollTop = container.scrollHeight;
                    this.$router.push({path: '/template/edit/' + (val.length - 1)})
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

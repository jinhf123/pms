Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};
Vue.use(VueNumeric.default);
const config = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    dictionary: {
        zh_CN: {
            attributes:
                {
                    projName: '项目名称',
                    projType: '项目类型',
                    beloProjGroup: '归属项目群',
                    startDate: '项目开始时间',
                    endDate: '项目结束时间',
                    isCompletYear: '是否年内完成',
                    projGroupManager: '项目群经理',
                    demaManager: '需求经理',
                    projMembers: '项目成员'
                }
        }

    },
    strict: true
};


Vue.use(VeeValidate, config);


Vue.component('modal', {
    props: ['member'],
    template: '#modal-template'
});

var vm = new Vue({
        el: '#projAdd',
        data: {
            fixed: 1,
            errMsg: "",
            errStep: "",
            project: {
                projName: null,
                projType: null,
                tempId: null,
                beloProjGroup: null,
                projLevel: null,
                consMode: null,
                undertakeMode: null,
                isCompletYear: 1,
                startDate: null,
                endDate: null
            },
            stakeholder: {
                projGroupManager: null,
                bigProjManager: null,
                projManager: null,
                demaManager: null,
                techManager: null,
                projMembers: null
            },
            showModal: false,
            isLoading: true,
            startDate: "",
            endDate: "",
            projType: [],
            consMode: [],
            projLevel: [],
            beloProjGroup: [],
            undertakeMode: [],
            template: [],
            tempIndex: null,
            defaultDate: 0,
            stepDate: [],
            projGroupManager: [],
            projGroupManagerId: [],
            bigProjManager: [],
            bigProjManagerId: [],
            projManager: [],
            projManagerId: [],
            demaManager: [],
            demaManagerId: [],
            techManager: [],
            techManagerId: [],
            projMembers: [],
            projMembersId: [],
            allMembersId: {},
            type: {
                1: 'projGroupManager',
                2: 'bigProjManager',
                3: 'projManager',
                4: 'demaManager',
                5: 'techManager',
                6: 'projMembers'
            },
            typeMap: {
                projGroupManager: "项目群经理",
                bigProjManager: "大项目经理",
                projManager: "项目经理",
                demaManager: "需求经理",
                techManager: "技术经理",
                projMembers: "项目成员"
            },
            updateMebmersId: [],
            oldUpdateMembersId: [],
            memberIndex: null,
            memberInfo: null,
            projCost:
                {
                    projectWorkTime: 0.000,
                    projectWorkCost:
                        0.000,
                    outsourceWorkTime:
                        0.000,
                    outsourceWorkCost:
                        0.000
                }
            ,
            stepWidth: 600,
            stepStart: 0,
            stepCount: 0
        },
        methods: {
            resetData: function () {
                this.project = {
                    projName: null,
                    projType: null,
                    tempId: null,
                    beloProjGroup: null,
                    projLevel: null,
                    consMode: null,
                    undertakeMode: null,
                    isCompletYear: null,
                    startDate: null,
                    endDate: null
                };
                this.stakeholder = {
                    projGroupManager: null,
                    bigProjManager: null,
                    projManager: null,
                    demaManager: null,
                    techManager: null,
                    projMembers: null
                };

                this.projCost = {
                    projectWorkTime: 0.000,
                    projectWorkCost: 0.000,
                    outsourceWorkTime: 0.000,
                    outsourceWorkCost: 0.000
                };

                this.stepDate = [];

            }
            ,
            getMacro: function () {
                this.$http.post("/sys/macro/getMacroByCatalog", {
                    "typeCodes":
                        ['projType',
                            'consMode',
                            'projLevel',
                            'projGroup',
                            'undertakeMode']
                })
                    .then(function (data) {
                        if ("projType" in data.data) {
                            for (var i in data.data["projType"]) {
                                this.projType.push({
                                    name: data.data["projType"][i]["name"],
                                    value: data.data["projType"][i]["value"]
                                });
                            }
                        }

                        if ("consMode" in data.data) {
                            for (var i in data.data["consMode"]) {
                                this.consMode.push({
                                    name: data.data["projType"][i]["name"],
                                    value: data.data["projType"][i]["value"]
                                });
                            }
                        }

                        if ("projLevel" in data.data) {
                            for (var i in data.data["projLevel"]) {
                                this.projLevel.push({
                                    name: data.data["projLevel"][i]["name"],
                                    value: data.data["projLevel"][i]["value"]
                                });
                            }
                        }

                        if ("projGroup" in data.data) {
                            for (var i in data.data["projGroup"]) {
                                this.beloProjGroup.push({
                                    name: data.data["projGroup"][i]["name"],
                                    value: data.data["projGroup"][i]["value"]
                                });
                            }
                        }

                        if ("undertakeMode" in data.data) {
                            for (var i in data.data["undertakeMode"]) {
                                this.undertakeMode.push({
                                    name: data.data["undertakeMode"][i]["name"],
                                    value: data.data["undertakeMode"][i]["value"]
                                });
                            }
                        }
                    }, function (err) {
                        console.log(err);
                    });
            }
            ,
            dateDefind: function () {
                var d, s;
                var self = this;
                d = new Date();
                s = d.yyyymmdd();
                $('#startDate').datetimepicker({
                    startDate: s,
                    minView: "month", //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1
                });

                $('#startDate').datetimepicker()
                    .on('hide', function (ev) {
                        var value = $("#startDate").val();
                        $('#endDate').datetimepicker("setStartDate", value);
                        self.startDate = value;
                    });

                $('#endDate').datetimepicker({
                    startDate: s,
                    minView: "month", //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1
                });

                $('#endDate').datetimepicker()
                    .on('hide', function (ev) {
                        var value = $("#endDate").val();
                        $('#startDate').datetimepicker("setEndDate", value);
                        self.endDate = value;
                    });

            }
            ,
            loadTemplate: function () {
                var me = this;
                me.isLoading = true;
                this.$http.get("/projMan/template")
                    .then(function (data) {
                        me.isLoading = false;
                        me.template = data.data;
                        var exist = me.template.map(function (x) {
                            return x.isDefault;
                        }).indexOf("1");
                        if (exist !== -1) {
                            me.tempIndex = exist;
                        } else {
                            me.tempIndex = 0;
                        }

                    }, function (err) {
                        console.log(err);
                    })
            }
            ,
            setStepDate: function () {
                var startDate;
                var endDate;

                if (this.startDate === null || this.startDate === "") {
                    startDate = null;

                } else {
                    startDate = new Date(Date.parse(this.startDate.replace(/-/g, "/")));
                }
                if (this.endDate === null) {
                    endDate = new Date(Date.parse("9999-01-01".replace(/-/g, "/")));
                } else {
                    endDate = new Date(Date.parse(this.endDate.replace(/-/g, "/")));
                }
                var defaultDate;
                var stepList;

                for (stepList in this.template[this.tempIndex].projTemplateStepEntities) {

                    if (startDate !== null) {
                        if (this.stepDate[stepList].defaultDate !== null) {
                            defaultDate = new Date(Date.parse(this.stepDate[stepList].defaultDate.replace(/-/g, "/")));
                            if (defaultDate > startDate) {
                                startDate = defaultDate;
                                break;
                            }
                        }
                        var moveDate = parseInt(this.template[this.tempIndex].projTemplateStepEntities[stepList].defaultMoveDate);

                        if (isNaN(moveDate)) {
                            startDate = null;
                            this.stepDate[stepList].defaultDate = null;
                        } else {
                            defaultDate = new Date(startDate.getTime() + moveDate * 24 * 60 * 60 * 1000);

                            if (defaultDate > endDate) {
                                startDate = null;
                                this.stepDate[stepList].defaultDate = null;
                            } else {
                                var s;
                                s = defaultDate.yyyymmdd();
                                this.stepDate[stepList].defaultDate = s;
                                startDate = defaultDate;
                            }
                        }
                    }
                }
                if ((this.endDate === null || this.endDate === "") && this.stepDate.length > 0) {
                    this.endDate = this.stepDate[stepList].defaultDate;
                }
            }
            ,
            setStepDateByEndDate: function () {
                var endDate;
                if (this.endDate === null) {
                    endDate = new Date(Date.parse("9999-01-01".replace(/-/g, "/")));
                } else {
                    endDate = new Date(Date.parse(this.endDate.replace(/-/g, "/")));
                }

                for (var stepList in this.template[this.tempIndex].projTemplateStepEntities) {
                    if (this.stepDate[stepList].defaultDate !== null) {
                        var defaultDate = new Date(Date.parse(this.stepDate[stepList].defaultDate.replace(/-/g, "/")));
                        if (defaultDate > endDate) {
                            this.stepDate[stepList].defaultDate = null;
                        }
                    }
                }
            }
            ,
            selectStaff: function (obj) {//添加任务选择人员
                var self = this;
                var userString = "";
                if (self[obj + "Id"].length > 0) {
                    userString = "&userId=" + self[obj + "Id"].join();
                }

                dialogOpen({
                    id: 'staffSelect',
                    title: '人员选择',
                    url: '/base/user/staff.html?singleSelect=false' + userString,
                    scroll: true,
                    width: "600px",
                    height: "600px",
                    yes: function (iframeId) {
                        var users = top.frames[iframeId].vm.selectData;
                        self[obj] = [];
                        self[obj + "Id"] = [];
                        for (var i = 0; i < users.length; i++) {
                            self[obj].push(users[i].username);
                            self[obj + "Id"].push(users[i].userId);
                        }

                        var index = top.layer.getFrameIndex(iframeId); //先得到当前iframe层的索引
                        top.layer.close(index); //再执行关闭
                    }
                })
            }
            ,
            show: function () {
                var seen = {};
                var ids = [];
                var j = 0;
                for (var i = 0; i < this.updateMebmersId.length; i++) {
                    var item = this.updateMebmersId[i];
                    if (seen[item] !== 1) {
                        seen[item] = 1;
                        ids[j++] = item;
                    }
                }
                var self = this;
                this.updateMebmersId = [];
                this.oldUpdateMembersId = ids.filter(function (x) {
                    return self.oldUpdateMembersId.indexOf(x) < 0
                });

                var allMember = {};
                if (ids.length !== 0) {
                    var self = this;
                    this.$http.post("/projMan/userCost", ids)
                        .then(function (data) {
                            for (var index in data.data) {
                                var cost = data.data[index];
                                //TODo:判断数据为空情况
                                if ('userId' in cost) {
                                    var member = {};
                                    member.position = self.allMembersId[cost['userId']].position;
                                    member.userId = cost.userId;
                                    member.username = cost.username;
                                    member.description = cost.description;
                                    member.cost = cost.cost;
                                    member.isOutsource = cost.isOutsource;
                                    member.time = (0).toFixed(this.fixed);
                                    member.workTime = [{
                                        userId: cost.userId,
                                        start: "",
                                        end: "",
                                        rate: 0
                                    }];
                                    Vue.set(self.allMembersId, cost['userId'], member);
                                }
                            }
                            self.memberIndex = Object.keys(self.allMembersId)[0];
                            self.showModal = true;
                        }, function (err) {
                            console.log(err);
                        });
                } else {
                    this.showModal = true;
                    if (typeof Object.keys(this.allMembersId)[0] !== "undefined") {
                        this.memberIndex = Object.keys(this.allMembersId)[0];
                    } else {
                        this.memberIndex = null;
                    }
                }
            }
            ,
            close: function () {
                // this.allMembersId[this.memberIndex] = this.memberInfo;
                this.showModal = false;
            }
            ,
            changeMembers: function (val, oldVal, type) {
                var addItem = [];
                var deleteItem = [];
                addItem = val.filter(function (x) {
                    return oldVal.indexOf(x) < 0
                });
                deleteItem = oldVal.filter(function (x) {
                    return val.indexOf(x) < 0
                });
                for (var i in addItem) {
                    if (!(addItem[i] in this.allMembersId)) {
                        this.allMembersId[addItem[i]] = {position: []}
                    }
                    this.allMembersId[addItem[i]].position.push(type);
                }
                for (var i in deleteItem) {
                    if (deleteItem[i] in this.allMembersId) {
                        if (this.allMembersId[deleteItem[i]].position.length === 1) {
                            delete this.allMembersId[deleteItem[i]];
                        } else {
                            this.allMembersId[deleteItem[i]].position = this.allMembersId[deleteItem[i]].position.filter(function (item) {
                                return item !== type
                            });
                        }
                    }
                }
                if (typeof Object.keys(this.allMembersId)[0] === "undefined") {
                    this.memberIndex = null;
                }
                this.getUpdateMemberId(addItem, deleteItem);
            }
            ,
            getUpdateMemberId: function (addItem, deleteItem) {
                for (var i in addItem) {
                    this.updateMebmersId.push(addItem[i]);
                }
                for (var i in deleteItem) {
                    var index = this.updateMebmersId.indexOf(deleteItem[i]);
                    if (index > -1) {
                        this.updateMebmersId.splice(index, 1);
                    }
                }
            }
            ,
            addWorkTime: function () {
                // var member = JSON.parse(JSON.stringify(this.allMembersId));
                // member[this.memberIndex].workTime.push({startDate: "", endDate: "", rate: 0});
                // this.allMembersId = member;
                // var member =  JSON.parse(JSON.stringify(this.allMembersId[this.memberIndex]));
                // member.workTime.push({startDate: "", endDate: "", rate: 0})
                // Vue.set(this.allMembersId, this.memberIndex, member);
                this.memberInfo.workTime.push({start: "", end: "", rate: 0});
            }
            ,
            changeWorkTime: function (index) {
                this.memberIndex = index;
            }
            ,
            changeUserTime: function () {

            },
            getPositionName: function (type) {
                var typeName = [];
                for (var i in this.typeMap) {
                    if (type.indexOf(i) !== -1) {
                        typeName.push(this.typeMap[i]);
                    }
                }
                return typeName.join("/");
            },
            removeStep: function (index) {
                this.memberInfo.workTime.splice(index, 1);
            },
            submitForm: function () {

                var self = this;
                this.$validator.validateAll().then(function (result) {
                    for (var i in self.$validator.errors.items) {
                        if (self.$validator.errors.items[i].field.indexOf("step") >= 0) {
                            self.errStep = "请检查步骤日期是否填写完毕";
                            return;
                        }
                    }
                    self.errStep = "";

                    self.errStep = "";
                    if (result) {
                        self.project.tempId = self.template[self.tempIndex].tempId;
                        self.project.startDate = self.startDate;
                        self.project.endDate = self.endDate;
                        self.stakeholder.projGroupManager = self.projGroupManagerId.join();
                        self.stakeholder.bigProjManager = self.bigProjManagerId.join();
                        self.stakeholder.projManager = self.projManagerId.join();
                        self.stakeholder.demaManager = self.demaManagerId.join();
                        self.stakeholder.techManager = self.techManagerId.join();
                        self.stakeholder.projMembers = self.projMembersId.join();

                        for (var i in self.stepDate) {

                            if (self.stepDate[i].defaultDate !== null && self.stepDate[i].defaultDate !== "") {
                                var noticeId = [];
                                var moveDate = parseInt(self.stepDate[i].finishNoticeDate);
                                if (isNaN(moveDate)) {
                                    moveDate = 0;
                                }
                                var defaultDate = new Date(Date.parse(self.stepDate[i].defaultDate.replace(/-/g, "/")));
                                var noticeDate = new Date(defaultDate.getTime() + moveDate * 24 * 60 * 60 * 1000);
                                self.stepDate[i].noticeDate = noticeDate.yyyymmdd();
                                if (self.stepDate[i].noticeStaff !== "") {
                                    var type = self.stepDate[i].noticeStaff.split(",");
                                    for (var j in type) {
                                        for (var k in self[self.type[type[j]] + "Id"]) {
                                            var key = self[self.type[type[j]] + "Id"][k];
                                            var exists = noticeId.indexOf(key);
                                            if (exists === -1) {
                                                noticeId.push(key);
                                            }
                                        }
                                    }
                                    self.stepDate[i].noticeId = noticeId;
                                }
                            }
                        }
                        var worktime = [];
                        for (var i in self.allMembersId) {
                            if ('workTime' in self.allMembersId[i]) {
                                for (var j in self.allMembersId[i].workTime) {
                                    if (self.allMembersId[i].workTime[j].start !== ""
                                        && self.allMembersId[i].workTime[j].start !== null
                                        && self.allMembersId[i].workTime[j].end !== ""
                                        && self.allMembersId[i].workTime[j].end !== null) {

                                        worktime.push(self.allMembersId[i].workTime[j]);
                                    }

                                }
                            }
                        }

                        if (worktime.length === 0) {
                            self.errMsg = "没有配置人力资源";
                        } else {
                            self.errMsg = "";
                            var params = {
                                projInfo: self.project,
                                projStep: self.stepDate,
                                projStakeholder: self.stakeholder,
                                projCost: self.projCost,
                                projUserWorkTime: worktime
                            };

                            self.$http.post("/projMan/proAdd", params)
                                .then(function (data) {
                                    var title;
                                    if (data.data.success) {
                                        title = "添加成功";
                                        dialogMsg(title);
                                        toUrl("/projectManage/projectDetails.html?projId="+ data.data.projId);
                                    } else {
                                        title = "添加失败";
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
                                                top.layer.close(top.layer.index);
                                            }
                                        });
                                    }

                                }, function (err) {
                                    console.log(err);
                                });
                        }


                    }
                });
            }
            ,
            toPrev: function () {
                this.stepStart--;
            }
            ,
            toNext: function () {
                this.stepStart++;
            }
            ,
            toProjMan: function () {
                toUrl('/projectManage/projectList.html');
            }
        }
        ,
        mounted: function () {
            this.dateDefind();
            this.loadTemplate();
            this.getMacro();
            this.stepWidth = document.getElementById('step-info').clientWidth;
            const that = this;
            window.onresize = function () {
                that.stepWidth = document.getElementById('step-info').clientWidth;
            };
        }
        ,
        created: function () {
            // this.$validator.localize('cn', {
            //     // messages: cn.messages,
            //     attributes: {
            //         projType: 'البريد الاليكتروني',
            //         phone: 'رقم الهاتف'
            //     },
            //     locale: 'zh_CN'
            // });
            // this.$validator.localize(cn);
        }
        ,
        watch: {
            startDate: function (val) {
                if (val !== "" && val !== null)
                    this.setStepDate();
            }
            ,
            endDate: function (val) {
                if (val !== "" && val !== null)
                    this.setStepDateByEndDate();
            }
            ,
            tempIndex: function (val) {
                this.stepDate = [];
                for (var stepList in this.template[this.tempIndex].projTemplateStepEntities) {
                    this.stepDate.push({
                        stepName: this.template[this.tempIndex].projTemplateStepEntities[stepList].stepName,
                        stepMod: this.template[this.tempIndex].projTemplateStepEntities[stepList].tempStepId,
                        noticeStaff: this.template[this.tempIndex].projTemplateStepEntities[stepList].noticeStaffId,
                        finishNoticeDate: this.template[this.tempIndex].projTemplateStepEntities[stepList].finishNoticeDate,
                        defaultDate: "",
                        noticeDate: "",
                        noticeId: []
                    });
                }
                this.setStepDate();
            }
            ,
            projGroupManagerId: function (val, oldVal) {
                this.changeMembers(val, oldVal, "projGroupManager");
            }
            ,
            bigProjManagerId: function (val, oldVal) {
                this.changeMembers(val, oldVal, "bigProjManager");
            }
            ,
            projManagerId: function (val, oldVal) {
                this.changeMembers(val, oldVal, "projManager");
            }
            ,
            demaManagerId: function (val, oldVal) {
                this.changeMembers(val, oldVal, "demaManager");
            }
            ,
            techManagerId: function (val, oldVal) {
                this.changeMembers(val, oldVal, "techManager");
            }
            ,
            projMembersId: function (val, oldVal) {
                this.changeMembers(val, oldVal, "projMembers");
            }
            ,
            memberIndex: function (val, oldVal) {
                if (val === null) {
                    this.memberInfo = null;
                } else {
                    this.memberInfo = this.allMembersId[val];
                }
            }
            ,
            'memberInfo.workTime': {
                handler: function (val) {
                    var time = 0;
                    for (var index in val) {
                        var start = val[index].start;
                        var end = val[index].end;
                        var rate = val[index].rate / 100;
                        var aDay = 24 * 60 * 60 * 1000;
                        var startDate = new Date(Date.parse(start.replace(/-/g, "/")));
                        var endDate = new Date(Date.parse(end.replace(/-/g, "/")));
                        var workDate = (endDate - startDate) / aDay;
                        if (!isNaN(rate) && !isNaN(workDate)) {
                            time = time + workDate * rate;
                        }
                    }
                    if (this.memberInfo !== null) {
                        this.memberInfo.time = (time / 30).toFixed(this.fixed);
                        this.projCost.projectWorkTime = 0.0;
                        this.projCost.projectWorkCost = 0.0;
                        this.projCost.outsourceWorkTime = 0.0;
                        this.projCost.outsourceWorkCost = 0.0;
                        for (var member in this.allMembersId) {
                            if (this.allMembersId[member].isOutsource === "1") {
                                this.projCost.outsourceWorkTime = parseFloat(this.projCost.outsourceWorkTime) + parseFloat(this.allMembersId[member].time);
                                this.projCost.outsourceWorkCost = parseFloat(this.projCost.outsourceWorkCost) + parseFloat(this.allMembersId[member].time * this.allMembersId[member].cost) / 10000;
                            }
                            this.projCost.projectWorkTime = parseFloat(this.projCost.projectWorkTime) + parseFloat(this.allMembersId[member].time);
                            this.projCost.projectWorkCost = parseFloat(this.projCost.projectWorkCost) + parseFloat(this.allMembersId[member].time * this.allMembersId[member].cost) / 10000;
                        }
                    }

                }
                ,
                deep: true
            },
            stepWidth: function (val) {
                var a = Math.floor((val - 40) / 162);
                this.stepCount = a;
            }
        }
        ,
        computed: {
            projGroupManagerName: function () {
                var names = "";
                for (var i = 0; i < this.projGroupManager.length; i++) {
                    names = names + this.projGroupManager[i] + ",";
                }
                if (names !== "") {
                    names = names.substring(0, names.length - 1);
                }
                return names;
            }
            ,
            bigProjManagerName: function () {
                var names = "";
                for (var i = 0; i < this.bigProjManager.length; i++) {
                    names = names + this.bigProjManager[i] + ",";
                }
                if (names !== "") {
                    names = names.substring(0, names.length - 1);
                }
                return names;
            }
            ,
            projManagerName: function () {
                var names = "";
                for (var i = 0; i < this.projManager.length; i++) {
                    names = names + this.projManager[i] + ",";
                }
                if (names !== "") {
                    names = names.substring(0, names.length - 1);
                }
                return names;
            }
            ,
            demaManagerName: function () {
                var names = "";
                for (var i = 0; i < this.demaManager.length; i++) {
                    names = names + this.demaManager[i] + ",";
                }
                if (names !== "") {
                    names = names.substring(0, names.length - 1);
                }
                return names;
            }
            ,
            techManagerName: function () {
                var names = "";
                for (var i = 0; i < this.techManager.length; i++) {
                    names = names + this.techManager[i] + ",";
                }
                if (names !== "") {
                    names = names.substring(0, names.length - 1);
                }
                return names;
            },
            projMembersName: function () {
                var names = "";
                for (var i = 0; i < this.projMembers.length; i++) {
                    names = names + this.projMembers[i] + ",";
                }
                if (names !== "") {
                    names = names.substring(0, names.length - 1);
                }
                return names;
            }
        }
    })
;


Vue.directive('datetimepicker', {
    bind: function (el, binding) {
        var self = this;
        $(el).datetimepicker({
            startDate: vm.startDate,
            endDate: vm.endDate,
            minView: "month",
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            todayBtn: 1,
            autoclose: 1
        });

        $(el).datetimepicker().on('hide', function (ev) {
            if (binding.value.length === 2) {
                vm[binding.value[0]][binding.value[1]].defaultDate = $(el).val();
            } else if (binding.value.length === 3) {
                var id = vm.memberIndex;
                var type = binding.value[1];
                var index = binding.value[2];
                var startDate = vm.memberInfo.workTime[index]["start"];
                var endDate = vm.memberInfo.workTime[index]["end"];
                if (type === "start") {
                    if (endDate === "" || endDate === null) {
                        vm.memberInfo.workTime[index][type] = $(el).val();

                    } else {
                        var end = new Date(Date.parse(endDate.replace(/-/g, "/")));
                        var newDate = new Date(Date.parse($(el).val().replace(/-/g, "/")));
                        if (newDate > end) {
                            alert("开始时间大于结束时间");
                            vm.memberInfo.workTime[index][type] = "";
                            el.value = '';
                        } else {
                            vm.memberInfo.workTime[index][type] = $(el).val();
                        }
                    }

                } else if (type === "end") {
                    if (startDate === "" || startDate === null) {
                        vm.memberInfo.workTime[index][type] = $(el).val();
                    } else {
                        var start = new Date(Date.parse(startDate.replace(/-/g, "/")));
                        var newDate = new Date(Date.parse($(el).val().replace(/-/g, "/")));
                        if (newDate < start) {
                            alert("结束时间小于结束时间");
                            el.value = '';
                        } else {
                            vm.memberInfo.workTime[index][type] = $(el).val();
                        }
                    }
                }

            }
        });

    },
    update: function (el, binding) {
        if (vm.startDate !== null) {
            $(el).datetimepicker("setStartDate", vm.startDate);
        }
        if (vm.endDate !== null) {
            $(el).datetimepicker("setEndDate", vm.endDate);
        }

    },
    unbind: function (el) {
        $(el).datetimepicker('remove');
    }
});

Vue.directive('number', {
    bind: function (el, binding) {
        $(el).on('focus', function () {
            if ($(el).val() === "0") {
                $(el).val("");
            }
        });
        $(el).on('blur', function () {
            var val = $(el).val().trim();
            var number;
            if (val === "" || val === null) {
                $(el).val("0");
                number = 0;
            } else {
                if (isNaN(parseInt(val))) {
                    //$(el).val("0");
                    number = 0;
                } else {
                    //$(el).val(parseInt(val));
                    number = parseInt(val);
                    var max = parseInt(binding.value.max);
                    var min = parseInt(binding.value.min);
                    if (number > max) {
                        number = max;
                    } else if (number < min) {
                        number = min;
                    }
                }
            }
            vm.memberInfo.workTime[binding.value.index].rate = number;
        })
    }
});
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};


Vue.component('modal', {
    props: ['member'],
    template: '#modal-template'
});

var vm = new Vue({
    el: '#projAdd',
    data: {
        project: {
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
        startDate: null,
        endDate: null,
        // projInfo: {},
        // steps: {},
        projType: ['新建类型', '旧类型'],
        consMode: ['独立项目', '合作项目'],
        projLevel: ['重点项目', '一般项目', '普通项目'],
        beloProjGroup: ['核心业务组', '常规业务组'],
        undertakeMode: ['联合建设', '独立建设'],
        template: [],
        tempIndex: null,
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
        type: ['projGroupManager', 'bigProjManager', 'projManager', 'demaManager', 'techManager', 'projMembers'],
        updateMebmersId: [],
        oldUpdateMembersId: [],
        memberIndex: null,
        memberInfo: null,
        projCost: {
            projectWorkTime: 0.000,
            projectWorkCost: 0.000,
            outsourceWorkTime: 0.000,
            outsourceWorkCost: 0.000
        }
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

        },
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

        },
        loadTemplate: function () {
            var me = this;
            me.isLoading = true;
            this.$http.get("/projMan/template")
                .then(function (data) {
                    me.isLoading = false;
                    me.template = data.data;
                    for (var temp in data.data) {
                        if (data.data[temp].isDefault === '1')
                            me.tempIndex = temp;
                    }
                }, function (err) {
                    console.log(err);
                })
        },
        setStepDate: function () {
            var startDate;
            var endDate;
            if (this.startDate === null || isNaN(this.startDate) || this.startDate === "") {
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
            if (this.endDate === null && this.stepDate.length > 0) {
                this.endDate = this.stepDate[stepList].defaultDate;
            }
        },
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
        },
        selectStaff: function (obj) {//添加任务选择人员
            var self = this;
            dialogOpen({
                id: 'staffSelect',
                title: '人员选择',
                url: 'base/user/staff.html?singleSelect=false',
                scroll: true,
                width: "600px",
                height: "600px",
                yes: function (iframeId) {
                    var users = top.frames[iframeId].vm.getSelections;
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
        },
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
                                member.position = self.allMembersId[cost['userId']].position
                                member.userId = cost.userId;
                                member.username = cost.username;
                                member.description = cost.description;
                                member.cost = cost.cost;
                                member.isOutsource = cost.isOutsource;
                                member.time = (0).toFixed(3);
                                member.workTime = [{
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
        },
        close: function () {
            // this.allMembersId[this.memberIndex] = this.memberInfo;
            this.showModal = false;
        },
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
        },
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
        },
        addWorkTime: function () {
            // var member = JSON.parse(JSON.stringify(this.allMembersId));
            // member[this.memberIndex].workTime.push({startDate: "", endDate: "", rate: 0});
            // this.allMembersId = member;
            // var member =  JSON.parse(JSON.stringify(this.allMembersId[this.memberIndex]));
            // member.workTime.push({startDate: "", endDate: "", rate: 0})
            // Vue.set(this.allMembersId, this.memberIndex, member);
            this.memberInfo.workTime.push({start: "", end: "", rate: 0});
        },
        changeWorkTime: function (index) {
            this.memberIndex = index;
        },
        changeUserTime: function () {

        },
        submitForm: function () {
            this.project.tempId = this.template[this.tempIndex].tempId;
            this.project.startDate = this.startDate;
            this.project.endDate = this.endDate;

            this.stakeholder.projGroupManager = this.projGroupManagerId.join();
            this.stakeholder.bigProjManager = this.bigProjManagerId.join();
            this.stakeholder.projManager = this.projManagerId.join();
            this.stakeholder.demaManager = this.demaManagerId.join();
            this.stakeholder.techManager = this.techManagerId.join();
            this.stakeholder.projMembers = this.projMembersId.join();

            var worktime = [];
            for (var i in this.allMembersId) {
                if ('workTime' in this.allMembersId[i]) {
                    for (var j in this.allMembersId[i].workTime) {
                        this.allMembersId[i].workTime[j].userId = this.allMembersId[i].userId;
                        worktime.push(this.allMembersId[i].workTime[j]);
                    }
                }
            }
            var params = {
                projInfo: this.project,
                projStep: this.stepDate,
                projStakeholder: this.stakeholder,
                projCost: this.projCost,
                projUserWorkTime: worktime
            };

            this.$http.post("/projMan/proAdd", params)
                .then(function (data) {
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
                            top.layer.close(top.layer.index);
                        }
                    });
                }, function (err) {
                    console.log(err);
                });

        }
    },
    mounted: function () {
        this.dateDefind();
        this.loadTemplate();
    },
    watch: {
        startDate: function (val) {
            this.setStepDate();
        },
        endDate: function (val) {
            this.setStepDateByEndDate();
        },
        tempIndex: function (val) {
            this.stepDate = [];
            for (var stepList in this.template[this.tempIndex].projTemplateStepEntities) {
                this.stepDate.push({
                    stepMod: this.template[this.tempIndex].projTemplateStepEntities[stepList].tempStepId,
                    defaultDate: null
                });
            }
            this.setStepDate();
        },
        projGroupManagerId: function (val, oldVal) {
            this.changeMembers(val, oldVal, "projGroupManager");
        },
        bigProjManagerId: function (val, oldVal) {
            this.changeMembers(val, oldVal, "bigProjManager");
        },
        projManagerId: function (val, oldVal) {
            this.changeMembers(val, oldVal, "projManager");
        },
        demaManagerId: function (val, oldVal) {
            this.changeMembers(val, oldVal, "demaManager");
        },
        techManagerId: function (val, oldVal) {
            this.changeMembers(val, oldVal, "techManager");
        },
        projMembersId: function (val, oldVal) {
            this.changeMembers(val, oldVal, "projMembers");
        },
        memberIndex: function (val, oldVal) {
            if (val === null) {
                this.memberInfo = null;
            } else {
                this.memberInfo = this.allMembersId[val];
            }
        },
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
                    this.memberInfo.time = (time / 30).toFixed(3);
                    this.projCost.projectWorkTime = 0.000;
                    this.projCost.projectWorkCost = 0.000;
                    this.projCost.outsourceWorkTime = 0.000;
                    this.projCost.outsourceWorkCost = 0.000;
                    for (var member in this.allMembersId) {
                        if (this.allMembersId[member].isOutsource === "0") {
                            this.projCost.projectWorkTime = parseFloat(this.projCost.projectWorkTime) + parseFloat(this.allMembersId[member].time);
                            this.projCost.projectWorkCost = parseFloat(this.projCost.projectWorkCost) + parseFloat(this.allMembersId[member].time * this.allMembersId[member].cost) / 10000;
                        } else if (this.allMembersId[member].isOutsource === "1") {
                            this.projCost.outsourceWorkTime = parseFloat(this.projCost.outsourceWorkTime) + parseFloat(this.allMembersId[member].time);
                            this.projCost.outsourceWorkCost = parseFloat(this.projCost.outsourceWorkCost) + parseFloat(this.allMembersId[member].time * this.allMembersId[member].cost) / 10000;
                        }
                    }
                }

            },
            deep: true
        }
    },
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
        },
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
        // projectWorkTime: function () {
        //     console.log("projectWorkTime");
        //     var time = 0;
        //     for (var member in  this.allMembersId) {
        //         if (member.isOutsource === "0")
        //             time = time + member.time;
        //     }
        //     return time;
        // },
        // projectWorkCost: function () {
        //     console.log("projectWorkCost");
        //     var cost = 0;
        //     return cost;
        // },
        // outsourceWorkTime: function () {
        //     console.log("outsourceWorkTime");
        //     var time = 0;
        //     return time;
        // },
        // outsourceWorkCost: function () {
        //     console.log("outsourceWorkCost");
        //     var cost = 0;
        //     return cost;
        // }
    }
});

function renderLines(el) {
    var d, s;
    d = new Date();
    s = d.getFullYear() + "-";             //取年份
    s = s + (d.getMonth() + 1) + "-";//取月份
    s += d.getDate();         //取日期
    $('.step-date-div').datetimepicker({
        startDate: s,
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        todayBtn: 1,
        autoclose: 1
    });
}

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
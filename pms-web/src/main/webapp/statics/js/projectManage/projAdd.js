Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};

var vm = new Vue({
    el: '#projAdd',
    data: {
        isLoading: true,
        startDate: null,
        endDate: null,
        projInfo: {},
        steps: {},
        projType: ['新建类型', '旧类型'],
        consMode: ['独立项目', '合作项目'],
        projLevel: ['重点项目', '一般项目', '普通项目'],
        beloProjGroup: ['核心业务组', '常规业务组'],
        undertakeMode: ['联合建设', '独立建设'],
        template: [],
        tempIndex: null,
        stepDate: []
    },
    methods: {
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
        changeTemplate: function () {
            // this.setStepDate();
            // console.log(this.tempIndex);
            // console.log(this.stepDate);
        },
        setStepDate: function () {
            var startDate;
            var endDate;
            if (this.startDate === null) {
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
            // console.log(this.stepDate);
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
        }
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
            //ev.date.yyyymmdd()
            //self.vm.$set(ev.date.yyyymmdd());
            vm.stepDate[binding.value].defaultDate = ev.date.yyyymmdd();
        });

    },
    update: function (el) {
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
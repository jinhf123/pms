/**
 * 项目信息
 */
$(function () {
    initialPage();
    load();
});

function initialPage() {
    $(window).resize(function () {
        vm.styleObj.paddingRight = (($(window).width() - 40 ) / 5 - 165 * 6 / 5) + 'px';
    });
    if (getQueryString('projId') != null) vm.projId = getQueryString('projId');
}


function load() {
    $.ajax({
        url: '/sys/macro/getMacroByCatalog',
        data: JSON.stringify({
            "typeCodes":
                ['projType',
                    'consMode',
                    'projLevel',
                    'projGroup',
                    'undertakeMode']
        }),
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.macro = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });

    $.ajax({
        url: '../../projMan/projDetail/getProjInfo?_' + $.now(),
        data: JSON.stringify({
            "projId": vm.projId
        }),
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.projInfo = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });


    $.ajax({
        url: '../../projMan/projDetail/getStepList?_' + $.now(),
        data: JSON.stringify({
            "projId": vm.projId
        }),
        type: "post",
        async: false,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            vm.steps = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}


var vm = new Vue({
    el: '#projInfo',
    data: {
        styleObj: {paddingRight: (($(window).width() - 40 ) / 5 - 165 * 6 / 5) + 'px'},
        projId: "1",//todo 开发时先默认为1
        start: 1,
        end: 6,
        projInfo: {},
        steps: {},
        macro: null
    },
    methods: {
        stepToLeft: function () {
            vm.start--;
            vm.end--;
        },
        stepToRight: function () {
            vm.start++;
            vm.end++;
        },
        isShowStep: function (num) {//是否显示步骤
            return (vm.start <= num && num <= vm.end );
        }
    },
    computed: {
        isCompletInAYear: function () {
            return this.projInfo.isCompletInAYear === "1" ? "是" : "否";
        },
        projType: function () {
            if (this.macro !== null&& this.projInfo.hasOwnProperty("tempName")) {
                var exist = this.macro.projType.map(function (t) {
                    return t.value;
                }).indexOf(this.projInfo.projType);

                return exist !== -1 ? this.macro.projType[exist].name : "";
            } else {
                return "";
            }
        },
        consMode: function () {
            if (this.macro !== null&& this.projInfo.hasOwnProperty("tempName")) {
                var exist = this.macro.consMode.map(function (t) {
                    return t.value;
                }).indexOf(this.projInfo.consMode);

                return exist !== -1 ? this.macro.consMode[exist].name : "";
            } else {
                return "";
            }
        },
        projLevel: function () {
            if (this.macro !== null&& this.projInfo.hasOwnProperty("tempName")) {
                var exist = this.macro.projLevel.map(function (t) {
                    return t.value;
                }).indexOf(this.projInfo.projLevel);

                return exist !== -1 ? this.macro.projLevel[exist].name : "";
            } else {
                return "";
            }
        },
        beloProjGroup: function () {
            if (this.macro !== null&& this.projInfo.hasOwnProperty("tempName")) {
                var exist = this.macro.projGroup.map(function (t) {
                    return t.value;
                }).indexOf(this.projInfo.beloProjGroup.toString());

                return exist !== -1 ? this.macro.projGroup[exist].name : "";
            } else {
                return "";
            }

        },
        undertakeMode: function () {
            if (this.macro !== null&& this.projInfo.hasOwnProperty("tempName")) {
                var exist = this.macro.undertakeMode.map(function (t) {
                    return t.value;
                }).indexOf(this.projInfo.undertakeMode);

                return exist !== -1 ? this.macro.undertakeMode[exist].name : "";
            } else {
                return "";
            }
        }
    }

});
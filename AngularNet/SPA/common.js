var x = 5;
function initialize() {
    //setInterval(function() {
    //    x += 5;
    //    var left = x + "px";
    //    document.getElementById("redbox").style.left = left;
    //}, 100);
}
var CrudUtils = (function () {
    function CrudUtils() {
    }
    CrudUtils.getLookupItem = function (array, val) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].value === val) {
                return array[i];
            }
        }
        return null;
    };
    CrudUtils.getLookupValue = function (item) {
        var r = -1;
        if (item != null) {
            r = item.value;
        }
        return r;
    };
    CrudUtils.endsWith = function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };
    CrudUtils.isoToLocalDate = function (isoDate) {
        var d = null;
        if (!isoDate) {
            return d;
        }
        if (typeof isoDate === "object") {
            return isoDate;
        }
        if (!CrudUtils.endsWith(isoDate, "Z")) {
            isoDate += "Z";
        }
        isoDate = isoDate.substring(0, 10);
        d = new Date(isoDate);
        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
        //d.setHours(d.getTimezoneOffset() / 60);
        return d;
    };
    CrudUtils.setDateIso = function (d) {
        if (!d) {
            return null;
        }
        var dd = angular.copy(d);
        dd.setTime(dd.getTime() - dd.getTimezoneOffset() * 60 * 1000);
        return dd;
    };
    return CrudUtils;
}());
function zeroDate(d) {
    if (d != undefined && d != null) {
        if (typeof (d.getTimezoneOffset) === "function" && d.zed == undefined) {
            d.setHours(-d.getTimezoneOffset() / 60, 0, 0, 0);
            d.zed = true;
        }
    }
}
function dateToMdy(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + "/" + y;
}
function printValue(date) {
    var currYear = date.getFullYear();
    var currMonth = date.getMonth() + 1; //Months are zero based
    if (currMonth < 10)
        currMonth = "0" + currMonth;
    var currDate = date.getDate();
    if (currDate < 10)
        currDate = "0" + currDate;
    //var curr_hour = date.getHours();
    //if (curr_hour < 10)
    //    curr_hour = "0" + curr_hour;
    //var curr_min = date.getMinutes();
    //if (curr_min < 10)
    //    curr_min = "0" + curr_min;
    //var curr_sec = date.getSeconds();
    //if (curr_sec < 10)
    //    curr_sec = "0" + curr_sec;
    return currMonth + "/" + currDate + "/" + +currYear; // + " " + curr_hour + ":" + curr_min + ":" + curr_sec;
}
function shiftDate(d) {
    if (d != undefined && d != null) {
        //return new Date(d);
        var s = d.replace(new RegExp('-', 'g'), '/');
        var dd = new Date(d);
        var off = dd.getTimezoneOffset();
        //dd.setTime(dd.getTime()); //alert(off)
        //dd.setTime(dd.getTime() + dd.getTimezoneOffset() * 60 * 1000); //alert(off)
        return dd;
    }
    return d;
}
function offsetZone(d) {
    if (d != undefined && d != null) {
        var dd = new Date(d);
        dd.setTime(dd.getTime() - dd.getTimezoneOffset() * 60 * 1000); //alert(off)
        return dd;
    }
    return d;
}
//module MyApplication {
//    export interface ISnowScope extends ng.IScope {
//        text1: string;
//        vm2: MainController;
//    }
//}
var EntityConfig = (function () {
    function EntityConfig() {
    }
    return EntityConfig;
}());
var TripModel = (function () {
    function TripModel() {
        this.tripId = 0;
        this.groupName = null;
        this.airportId = -1;
        this.transTypeId = -1;
        this.tripDate = new Date();
        this.tripDate.setHours(0, 0, 0, 0);
        this.groupSize = 0;
        this.isNew = true;
    }
    TripModel.onGetAll = function (models) {
        for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
            var model = models_1[_i];
            TripModel.onGet(model);
        }
    };
    TripModel.onGet = function (model) {
        model.tripDate_ = CrudUtils.isoToLocalDate(model.tripDate);
        model.transTypeId_ = CrudUtils.getLookupItem(CrudUtils.ref.transTypes, model.transTypeId);
    };
    TripModel.onSaveAll = function (models) {
        for (var _i = 0, models_2 = models; _i < models_2.length; _i++) {
            var model = models_2[_i];
            TripModel.onSave(model);
        }
    };
    TripModel.onSave = function (model) {
        // Add PK from a parent if master-detai;
        //
        model.tripDate = CrudUtils.setDateIso(model.tripDate_);
        model.transTypeId_ = CrudUtils.getLookupItem(CrudUtils.ref.transTypes, model.transTypeId);
    };
    return TripModel;
}());
var TripWorker = (function () {
    function TripWorker() {
        this.model = null;
        this.modelCopy = null;
        this.list = [];
        this.form = null;
    }
    return TripWorker;
}());
//# sourceMappingURL=common.js.map
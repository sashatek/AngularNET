interface ILookupItem {
    value: number;
    value2: number;
    text: string;
    text2: string;
    isSet: boolean;
}

interface IGlobals {
    searchText?: string;
}
var x = 5;

function initialize() {
    //setInterval(function() {
    //    x += 5;
    //    var left = x + "px";
    //    document.getElementById("redbox").style.left = left;
    //}, 100);
}

class CrudUtils {
    static ref: any;

    static getLookupItem(array: ILookupItem[], val: number): ILookupItem {
        for (var i = 0; i < array.length; i++) {
            if (array[i].value === val) {
                return array[i];
            }
        }
        return null;
    }

    static getLookupValue(item: ILookupItem) {
        var r = -1;
        if (item != null) {
            r = item.value;
        }
        return r;
    }


    static endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    static isoToLocalDate(isoDate: any) {
        var d: Date = null;
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
    }


    static setDateIso(d: Date) {
        if (!d) {
            return null;
        }
        var dd = angular.copy(d);
        dd.setTime(dd.getTime() - dd.getTimezoneOffset() * 60 * 1000);
        return dd;
    }
}


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

function printValue(date : Date) {

    var currYear = date.getFullYear();

    var currMonth : any = date.getMonth() + 1; //Months are zero based
    if (currMonth < 10)
        currMonth = "0" + currMonth;

    var currDate : any = date.getDate();
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

    return  currMonth + "/" + currDate +"/" + +currYear; // + " " + curr_hour + ":" + curr_min + ":" + curr_sec;

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
//function mainResize() {
//    var sh = document.getElementById('sform').offsetHeight;
//    var ah = document.getElementById('appwin').clientHeight;
//    var srch3 = document.getElementById('srch3').clientHeight;
//    //var h = document.getElementById('someDiv').clientHeight;
//    //var h = document.getElementById('someDiv').offsetHeight;
//    //var h = document.getElementById('someDiv').scrollHeight;
//    var th = ah - sh - srch3 - 30;
//    document.getElementById('srchtab').style.height = th.toString() + "px";
//}

//window.onresize = function () {
//    //mainResize();
//};

//function initialize() {


declare var urlApp: string;
declare var userId: number;

//module MyApplication {
//    export interface ISnowScope extends ng.IScope {
//        text1: string;
//        vm2: MainController;
//    }
//}

class EntityConfig {
    static coreUrl: string;

    name: string;
    url: string;
    addEmptyLine: boolean;
    nullModel: boolean;

}

class TripModel {
    tripId: number;
    groupName: string;
    airportId: number;
    airportId_: ILookupItem;
    transTypeId: number;
    transTypeId_: ILookupItem;
    tripDate: Date;
    tripDate_: Date;
    groupSize: number;

    isNew: boolean;
    form: any;
    static ref: any;

    constructor() {
        this.tripId = 0;
        this.groupName = null;
        this.airportId = -1;
        this.transTypeId = -1;
        this.tripDate = new Date();
        this.tripDate.setHours(0, 0, 0, 0);
        this.groupSize = 0;

        this.isNew = true;
    }

    static onGetAll(models: TripModel[]) {
        for (var model of models) {
            TripModel.onGet(model);
        }
     }

    static onGet(model: TripModel) {
        model.tripDate_ = CrudUtils.isoToLocalDate(model.tripDate);
        model.transTypeId_ = CrudUtils.getLookupItem(CrudUtils.ref.transTypes, model.transTypeId);
    }

    static onSaveAll(models: TripModel[]) {
        for (var model of models) {
            TripModel.onSave(model);
        }
    }

    static onSave(model: TripModel) {
        // Add PK from a parent if master-detai;
        //
        model.tripDate = CrudUtils.setDateIso(model.tripDate_);
        model.transTypeId_ = CrudUtils.getLookupItem(CrudUtils.ref.transTypes, model.transTypeId);
    }
}




class TripWorker {
    model: TripModel;
    modelCopy: TripModel;
    list: TripModel[];
    form: any;

    constructor() {
        this.model = null;
        this.modelCopy = null;
        this.list = [];
        this.form = null;
    }
}


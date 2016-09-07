var Application;
(function (Application) {
    var TheAppController = (function () {
        function TheAppController(ds, $scope, $timeout) {
            var _this = this;
            this.ds = ds;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.viewMode = -1;
            this.searchText = "";
            this.onGetRefs = function (data) {
                CrudUtils.ref = _this.ds.ref;
                _this.viewMode = 1;
            };
            this.errorMessage = null;
            this.sTest = "Smart Notes";
            this.ds.getRefs(this.onGetRefs);
            $scope.urlApp = urlApp;
            //this.load();
        }
        TheAppController.$inject = [
            "DataService",
            "$scope",
            "$timeout"
        ];
        return TheAppController;
    }());
    Application.TheAppController = TheAppController;
})(Application || (Application = {}));
var uiLib = isMaterial ? "ngMaterial" : "ui.bootstrap";
var TheAppModule = angular.module("TripAppModule", [uiLib])
    .factory("DataService", [
    "$http", "$location", function ($http, $location) { return new Application.Services.DataService($http, $location); }
])
    .directive("autoOpen", [
    "$parse", function ($parse) {
        return {
            link: function (scope, iElement, iAttrs) {
                var isolatedScope = iElement.isolateScope();
                iElement.on("click", function () {
                    isolatedScope.$apply(function () {
                        $parse("isOpen").assign(isolatedScope, "true");
                    });
                });
            }
        };
    }
])
    .directive("notSet", function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngModel, function (value) {
                var r = value == attr.notSet;
                ctrl.$setValidity("requiredd", !r);
            });
            //if (!ctrl) return;
            //ctrl.$parsers.unshift(function(value) {
            //    if (value) {
            //        var isSet = value !== "-1";
            //    }
            //});
        }
    };
})
    .controller("TripAppController", Application.TheAppController)
    .component("tripForm", Application.tripForm)
    .component("tripEntryGrid", Application.tripGridComponent)
    .component("tripInlineGrid", Application.tripInlineGrid)
    .component("tripNavToForm", Application.tripNavToForm)
    .component("tripPopupGrid", Application.tripPopupGrid)
    .component("tripSideFormGrid", Application.tripSideFormGrid);
// GridA, GridI, GridP, GridS, GridN
//# sourceMappingURL=TripAppController.js.map
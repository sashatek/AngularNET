module Application {

    export class TheAppController {

        static $inject = [
            "DataService",
            "$scope",
            "$timeout"
        ];

        sTest: string;
        errorMessage: string;
        viewMode: number = -1;
        that: any;
        searchText : string = "";

        constructor(private ds: Services.DataService, private $scope, private $timeout) {
            this.errorMessage = null;
            this.sTest = "Smart Notes";
            this.ds.getRefs(this.onGetRefs);
            $scope.urlApp = urlApp;
            //this.load();
        }

        onGetRefs = (data)=> {
            CrudUtils.ref = this.ds.ref;
            this.viewMode =1;
        }

    }
}

declare var isMaterial: boolean;

var uiLib: string = isMaterial ? "ngMaterial" : "ui.bootstrap";

var TheAppModule = angular.module("TripAppModule", [uiLib])
    //.directive('datepickerPopup', function() {
    //    return {
    //        restrict: 'EAC',
    //        require: 'ngModel',
    //        link: function(scope, element, attr, controller : any) {
    //            //remove the default formatter from the input directive to prevent conflict
    //            controller.$formatters.shift();
    //        }
    //    }
    //})
    .factory("DataService", [
        "$http", "$location", ($http, $location) => new Application.Services.DataService($http, $location)
    ])
    .directive("autoOpen", [
        "$parse", function($parse) {
            return {
                link: function(scope, iElement, iAttrs) {
                    var isolatedScope = iElement.isolateScope();
                    iElement.on("click", function() {
                        isolatedScope.$apply(function() {
                            $parse("isOpen").assign(isolatedScope, "true");
                        });
                    });
                }
            };
        }
    ])
    .directive("notSet", function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attr: any, ctrl) {
                scope.$watch(attr.ngModel, function(value) {
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

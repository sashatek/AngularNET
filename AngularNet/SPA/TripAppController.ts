module Application {

    var code = [
        { url: "https://github.com/sashatek/AngularNet", name: "Project on Github" },
        { url: "", name: "divider" },
        { url: "SPA/TripAppController.ts", name: "App Controller"},
        { url: "SPA/DataServices.ts", name: "Data Service"},
        { url: "Views/App/TripApp.cshtml", name: "App HTML"},
        { url: "", name: "divider" },
        { url: "SPA/Components/TripEntryGrid.ts", name: "Entry Grid Component"},
        { url: "Views/Component/TripEntryGrid.cshtml", name: "Entry Grid HTML"},
        { url: "SPA/Components/TripForm.ts", name: "Form Component"},
        { url: "Views/Component/TripForm.cshtml", name: "Form HTML"},
        { url: "SPA/Components/TripPopupGrid.ts", name: "Popup Form Component"},
        { url: "Views/Component/TripPopupGrid.cshtml" , name: " Form HTML"},
        { url: "SPA/Components/TripNavToForm.ts", name: "Nav To Form Component"},
        { url: "Views/Component/TripNavToForm.cshtml", name: "To Form HTML"},
        { url: "SPA/Components/TripSideFormGrid.ts", name: "Siade Form Component"},
        { url: "Views/Component/TripSideFormGrid.cshtml", name: "Side Form HTML"},
        { url: "SPA/Components/TripInlineGrid.ts", name: "Inline Edit Component"},
        { url: "Views/Component/TripInlineGrid.cshtml", name: "Inline edit HTML"}

    ];

 
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
        code = code;
        navCollapsed :boolean;
        actions;

        constructor(private ds: Services.DataService, private $scope, private $timeout) {
            this.errorMessage = null;
            this.sTest = "Smart Notes";
            this.ds.getRefs(this.onGetRefs);
            $scope.urlApp = urlApp;
            //this.load();
            this.actions = [
                { action: 1, text: "EntryGrid" },
                { action: 2, text: "Popup Form" },
                { action: 6, text: "Nav to Form" },
                { action: 3, text: "Side Form" },
                { action: 4, text: "Inline" }
            ];
        }

        onGetRefs = (data)=> {
            CrudUtils.ref = this.ds.ref;
            this.viewMode =1;
        }

        test() {
            this.navCollapsed = !this.navCollapsed;
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

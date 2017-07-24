var Application;
(function (Application) {
    var TripPopFormController = (function () {
        //private ds: Services.DataService;
        function TripPopFormController($scope, $modalInstance, model, ds) {
            this.$scope = $scope;
            this.$modalInstance = $modalInstance;
            this.model = model;
            this.ds = ds;
            this.trip = new TripWorker();
            this.onAddTrip = function (model) {
            };
            this.onSaveTrip = function (model) {
            };
            this.trip = this.ds.trip;
            this.trip.modelCopy = angular.copy(model);
        }
        TripPopFormController.prototype.selTrans = function (model, item) {
            var a = 0;
        };
        TripPopFormController.prototype.formInit = function (form) {
            this.model.form = form;
        };
        TripPopFormController.prototype.saveTrip = function (model, form) {
            form.$setPristine();
            this.ds.saveModel(EntityType.Trip, this.model, this.onAddTrip, this.onSaveTrip);
            this.$modalInstance.close(this.model);
        };
        TripPopFormController.prototype.cancel = function () {
            angular.copy(this.trip.modelCopy, this.model);
            this.$modalInstance.dismiss('cancel');
        };
        TripPopFormController.$inject = [
            "$scope",
            "$uibModalInstance",
            "model",
            "ds"
        ];
        return TripPopFormController;
    }());
    Application.TripPopFormController = TripPopFormController;
})(Application || (Application = {}));
var Application;
(function (Application) {
    var TripPopupGridController = (function () {
        function TripPopupGridController($scope, $modal) {
            var _this = this;
            this.$scope = $scope;
            this.$modal = $modal;
            this.sTest = "String from the Trip ListPopController";
            this.errorMessage = null;
            this.trip = new TripWorker();
            this.onGetAllTrips = function (trips) {
                _this.trip.list = trips;
                _this.newTrip();
            };
            this.editTrip = function (model) {
                //ver = model.icdInfo.ICDVersion;
                //$scope.model.drops = $scope.s.data;
                var that = _this;
                var modalInstance = that.$modal.open({
                    templateUrl: urlApp + 'Partial/TripPopForm',
                    controller: Application.TripPopFormController,
                    controllerAs: 'fc',
                    resolve: {
                        model: function () {
                            return model;
                        },
                        ds: function () {
                            return that.ds;
                        }
                    },
                    backdrop: "static",
                    size: "sm",
                    animation: true,
                    windowClass: "modal fade in"
                });
                modalInstance.result.then(function (model) {
                    if (model.isNew) {
                        model.isNew = false;
                        that.trip.list.unshift(model);
                    }
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            };
            this.onDeleteTrip = function (model) {
                var index = _this.trip.list.indexOf(model);
                _this.trip.list.splice(index, 1);
            };
            this.trip = this.ds.trip;
            $scope.dateToMdy = dateToMdy;
            this.load();
        }
        TripPopupGridController.prototype.load = function () {
            var qry = 0;
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAllTrips);
        };
        TripPopupGridController.prototype.addTrip = function () {
            var model = this.newTrip();
            this.editTrip(model);
        };
        TripPopupGridController.prototype.deleteTrip = function (model) {
            this.ds.deleteModel(EntityType.Trip, model, this.onDeleteTrip);
        };
        TripPopupGridController.prototype.newTrip = function () {
            var model = new TripModel();
            TripModel.onGet(model);
            return model;
        };
        TripPopupGridController.$inject = [
            "$scope",
            "$uibModal"
        ];
        return TripPopupGridController;
    }());
    Application.TripPopupGridController = TripPopupGridController;
    Application.tripPopupGrid = {
        bindings: {
            ds: '=',
            formInit: '&'
        },
        controller: Application.TripPopupGridController,
        controllerAs: 'gc',
        templateUrl: urlApp + 'Component/TripPopupGrid'
    };
})(Application || (Application = {}));
//# sourceMappingURL=TripPopupGrid.js.map
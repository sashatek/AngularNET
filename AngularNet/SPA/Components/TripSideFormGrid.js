var Application;
(function (Application) {
    var TripSideFormGridController = (function () {
        function TripSideFormGridController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.sTest = "String from the Trip ListPopController";
            this.errorMessage = null;
            this.trip = new TripWorker();
            this.showForm = false;
            this.onGetAllTrips = function (trips) {
                _this.trip.list = trips;
                _this.newTrip();
            };
            this.onAddTrip = function (model) {
                model.isNew = false;
                _this.trip.list.unshift(model);
                _this.trip.model = _this.trip.modelCopy = null;
            };
            this.onSaveTrip = function (model) {
                _this.trip.model = _this.trip.modelCopy = null;
            };
            this.onDeleteTrip = function (model) {
                var index = _this.trip.list.indexOf(model);
                _this.trip.list.splice(index, 1);
                _this.trip.model = null;
                _this.trip.modelCopy = null;
            };
            this.trip = this.ds.trip;
            $scope.dateToMdy = dateToMdy;
            this.load();
        }
        TripSideFormGridController.prototype.load = function () {
            var qry = 0;
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAllTrips);
        };
        TripSideFormGridController.prototype.addTrip = function () {
            this.trip.model = this.newTrip();
            this.trip.modelCopy = null;
            ;
        };
        TripSideFormGridController.prototype.editTrip = function (model, form) {
            if (this.trip.model && this.trip.model.form && this.trip.model.form.$dirty) {
                return;
            }
            this.trip.model = model;
            this.trip.modelCopy = angular.copy(model);
        };
        TripSideFormGridController.prototype.onFormInit = function (form) {
            this.trip.model.form = form;
        };
        TripSideFormGridController.prototype.saveTrip = function (model, form) {
            form.$setPristine();
            this.ds.saveModel(EntityType.Trip, this.trip.model, this.onAddTrip, this.onSaveTrip);
        };
        TripSideFormGridController.prototype.deleteTrip = function (model) {
            this.ds.deleteModel(EntityType.Trip, this.trip.model, this.onDeleteTrip);
        };
        TripSideFormGridController.prototype.newTrip = function () {
            var model = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            return model;
        };
        TripSideFormGridController.prototype.cancel = function () {
            if (this.trip.modelCopy) {
                angular.copy(this.trip.modelCopy, this.trip.model);
            }
            this.trip.model = null;
            this.trip.modelCopy = null;
        };
        TripSideFormGridController.prototype.init = function (form) {
            this.trip.model.form = form;
        };
        TripSideFormGridController.$inject = [
            "DataService",
            "$scope"
        ];
        return TripSideFormGridController;
    }());
    Application.TripSideFormGridController = TripSideFormGridController;
    Application.tripSideFormGrid = {
        bindings: {
            ds: '=',
            formInit: '&'
        },
        controller: Application.TripSideFormGridController,
        controllerAs: 'gc',
        templateUrl: urlApp + 'Component/TripSideFormGrid'
    };
})(Application || (Application = {}));
//# sourceMappingURL=TripSideFormGrid.js.map
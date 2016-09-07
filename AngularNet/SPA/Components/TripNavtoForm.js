var Application;
(function (Application) {
    //import Services = Application.Services;
    var TripNavToFormController = (function () {
        function TripNavToFormController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.errorMessage = null;
            this.trip = new TripWorker();
            this.showForm = false;
            this.editMode = 0;
            this.onGetAllTrips = function (trips) {
                _this.trip.list = trips;
            };
            this.onAddTrip = function (model) {
                model.isNew = false;
                _this.trip.list.unshift(model);
            };
            this.onSaveTrip = function (model) {
            };
            this.onDeleteTrip = function (model) {
            };
            this.trip = this.ds.trip;
            $scope.dateToMdy = dateToMdy;
            this.load();
        }
        TripNavToFormController.prototype.load = function () {
            var qry = 0;
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAllTrips);
        };
        TripNavToFormController.prototype.formInit = function (form) {
            this.trip.model.form = form;
        };
        TripNavToFormController.prototype.addTrip = function () {
            this.trip.model = this.newTrip();
            this.trip.modelCopy = null;
            ;
            this.editMode = 1;
        };
        TripNavToFormController.prototype.editTrip = function (model, form) {
            this.trip.model = model;
            this.trip.modelCopy = angular.copy(model);
            this.editMode = 1;
        };
        TripNavToFormController.prototype.saveTrip = function (model) {
            this.ds.saveModel(EntityType.Trip, this.trip.model, this.onAddTrip, this.onSaveTrip);
            this.trip.model = this.trip.modelCopy = null;
            this.editMode = 0;
        };
        TripNavToFormController.prototype.deleteTrip = function (model) {
            if (this.ds.deleteModel(EntityType.Trip, model, this.onDeleteTrip)) {
                // If Sync move the below to onDeleteTrip
                //
                this.trip.list.splice(this.trip.list.indexOf(model), 1);
                this.trip.model = this.trip.modelCopy = null;
                this.editMode = 0;
            }
        };
        TripNavToFormController.prototype.newTrip = function () {
            var model = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            return model;
        };
        TripNavToFormController.prototype.cancelTrip = function () {
            if (this.trip.modelCopy) {
                angular.copy(this.trip.modelCopy, this.trip.model);
            }
            this.trip.model = null;
            this.trip.modelCopy = null;
            this.editMode = 0;
        };
        TripNavToFormController.$inject = [
            "$scope"
        ];
        return TripNavToFormController;
    }());
    Application.TripNavToFormController = TripNavToFormController;
    Application.tripNavToForm = {
        bindings: {
            ds: '=',
            formInit: '&'
        },
        controller: Application.TripNavToFormController,
        controllerAs: 'gc',
        templateUrl: urlApp + 'Component/TripNavToForm'
    };
})(Application || (Application = {}));
//# sourceMappingURL=TripNavToForm.js.map
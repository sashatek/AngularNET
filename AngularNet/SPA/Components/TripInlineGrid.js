var Application;
(function (Application) {
    var TripInlineInlineController = (function () {
        function TripInlineInlineController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.trip = new TripWorker();
            this.model = null;
            this.modelCopy = null;
            this.form = null;
            this.onGetAllTrips = function (trips) {
                _this.newTrip();
            };
            this.onAddTrip = function (model) {
                model.isNew = false;
            };
            this.onSaveTrip = function (model) {
            };
            this.onDeleteTrip = function (model) {
            };
            this.trip = this.ds.trip;
            $scope.dateToMdy = dateToMdy;
            this.load();
        }
        TripInlineInlineController.prototype.load = function () {
            var qry = 0;
            this.trip.list = [];
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAllTrips);
        };
        TripInlineInlineController.prototype.addTrip = function () {
            this.model = this.newTrip();
            this.modelCopy = null;
            ;
        };
        TripInlineInlineController.prototype.editTrip = function (model, form) {
            if (this.model && this.form.$dirty) {
                return;
            }
            this.model = model;
            this.modelCopy = angular.copy(model);
            this.form = form;
        };
        TripInlineInlineController.prototype.saveTrip = function (model, form) {
            if (model.isNew) {
                this.newTrip();
            }
            model.form = form;
            this.trip.model = model;
            this.ds.saveModel(EntityType.Trip, model, this.onAddTrip, this.onSaveTrip);
            model.form.$setPristine();
            this.model = this.modelCopy = null;
        };
        TripInlineInlineController.prototype.deleteTrip = function (model, form) {
            if (this.ds.deleteModel(EntityType.Trip, model, this.onDeleteTrip)) {
                this.trip.list.splice(this.trip.list.indexOf(model), 1);
                this.model = this.modelCopy = null;
            }
        };
        TripInlineInlineController.prototype.newTrip = function () {
            var model = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            this.trip.list.push(model);
            return model;
        };
        TripInlineInlineController.prototype.cancel = function (model, form) {
            if (this.modelCopy) {
                angular.copy(this.modelCopy, this.model);
            }
            form.$setPristine();
            this.model = null;
            this.modelCopy = null;
        };
        TripInlineInlineController.$inject = [
            "$scope"
        ];
        return TripInlineInlineController;
    }());
    Application.TripInlineInlineController = TripInlineInlineController;
    Application.tripInlineGrid = {
        bindings: {
            ds: '=',
            formInit: '&'
        },
        controller: Application.TripInlineInlineController,
        controllerAs: 'gc',
        templateUrl: urlApp + 'Component/TripInlineGrid'
    };
})(Application || (Application = {}));
//# sourceMappingURL=TripInlineGrid.js.map
var Application;
(function (Application) {
    var TripGridController = (function () {
        function TripGridController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.trip = new TripWorker();
            this.entityType = EntityType.Trip;
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
            this.load();
        }
        TripGridController.prototype.load = function () {
            var qry = 0;
            this.trip.list = [];
            this.ds.getAllModels(this.entityType, qry, this.onGetAllTrips);
        };
        //onGetTrip = (trip: TripModel) => {
        //}
        TripGridController.prototype.saveTrip = function (model, form) {
            this.ds.saveModel(this.entityType, model, this.onAddTrip, this.onSaveTrip);
            form.$setPristine();
            if (model.isNew) {
                this.newTrip();
            }
        };
        TripGridController.prototype.deleteTrip = function (model, form) {
            if (this.ds.deleteModel(this.entityType, model, this.onDeleteTrip)) {
                this.trip.list.splice(this.trip.list.indexOf(model), 1);
            }
        };
        TripGridController.prototype.newTrip = function () {
            var model = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            this.trip.list.push(model);
        };
        TripGridController.$inject = [
            "$scope"
        ];
        return TripGridController;
    }());
    Application.tripGridComponent = {
        bindings: {
            ds: '<',
            search: "<",
            formInit: '&'
        },
        controller: TripGridController,
        controllerAs: 'gc',
        templateUrl: urlApp + 'Component/TripEntryGrid'
    };
})(Application || (Application = {}));
//# sourceMappingURL=TripEntryGrid.js.map
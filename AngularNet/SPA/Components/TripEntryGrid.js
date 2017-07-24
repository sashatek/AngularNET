var Application;
(function (Application) {
    var TripGridController = (function () {
        function TripGridController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.entityType = EntityType.Trip;
            this.onGetAll = function (data) {
                _this.list = data;
                _this.addLine();
            };
            this.onAdd = function (model) {
                model.isNew = false;
            };
            this.onSave = function (model) {
            };
            this.onDelete = function (model) {
            };
        }
        TripGridController.prototype.$onInit = function () {
            //this.list = this.ds.trip.list;
            this.load();
        };
        TripGridController.prototype.load = function () {
            var qry = 0;
            this.list = [];
            this.ds.getAllModels(this.entityType, qry, this.onGetAll);
        };
        //onGet = (data: YourModel) => {
        //}
        TripGridController.prototype.save = function (model, form) {
            if (model.isNew) {
            }
            this.ds.saveModel(this.entityType, model, this.onAdd, this.onSave);
            form.$setPristine();
            if (model.isNew) {
                this.addLine();
            }
        };
        TripGridController.prototype.delete = function (model, form) {
            if (this.ds.deleteModel(this.entityType, model, this.onDelete)) {
                this.list.splice(this.list.indexOf(model), 1);
            }
        };
        TripGridController.prototype.addLine = function () {
            var model = new TripModel();
            TripModel.onGet(model);
            this.list.push(model);
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
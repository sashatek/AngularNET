var Application;
(function (Application) {
    var TripInlineInlineController = (function () {
        function TripInlineInlineController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.list = null;
            this.model = null;
            this.modelCopy = null;
            this.form = null;
            this.onGetAll = function (data) {
                _this.list = data;
                _this.newRow();
            };
            this.onAdd = function (model) {
                model.isNew = false;
            };
            this.onSave = function (model) {
            };
            this.onDelete = function (model) {
            };
            $scope.dateToMdy = dateToMdy;
        }
        TripInlineInlineController.prototype.$onInit = function () {
            //this.list = this.ds.list;
            this.load();
        };
        TripInlineInlineController.prototype.load = function () {
            var qry = 0;
            this.list = [];
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAll);
        };
        TripInlineInlineController.prototype.add = function () {
            this.model = this.newRow();
            this.modelCopy = null;
            ;
        };
        TripInlineInlineController.prototype.edit = function (model, form) {
            if (this.model && this.form.$dirty) {
                return;
            }
            this.model = model;
            this.modelCopy = angular.copy(model);
            this.form = form;
        };
        TripInlineInlineController.prototype.save = function (model, form) {
            if (model.isNew) {
                this.newRow();
            }
            model.form = form;
            this.model = model;
            this.ds.saveModel(EntityType.Trip, model, this.onAdd, this.onSave);
            model.form.$setPristine();
            this.model = this.modelCopy = null;
        };
        TripInlineInlineController.prototype.delete = function (model, form) {
            if (this.ds.deleteModel(EntityType.Trip, model, this.onDelete)) {
                this.list.splice(this.list.indexOf(model), 1);
                this.model = this.modelCopy = null;
            }
        };
        TripInlineInlineController.prototype.newRow = function () {
            var model = new TripModel();
            TripModel.onGet(model);
            this.list.push(model);
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
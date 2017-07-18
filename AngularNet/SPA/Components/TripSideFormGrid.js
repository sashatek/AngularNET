var Application;
(function (Application) {
    var TripSideFormGridController = (function () {
        function TripSideFormGridController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.list = null;
            this.model = null;
            this.modelCopy = null;
            this.showForm = false;
            this.onGetAll = function (data) {
                _this.list = data;
                _this.newRow();
            };
            this.onAdd = function (model) {
                model.isNew = false;
                _this.list.unshift(model);
                _this.model = _this.modelCopy = null;
            };
            this.onSave = function (model) {
                if (model === _this.model) {
                    _this.model = _this.modelCopy = null;
                }
            };
            this.onDelete = function (model) {
                var index = _this.list.indexOf(model);
                _this.list.splice(index, 1);
                _this.model = null;
                _this.modelCopy = null;
            };
            $scope.dateToMdy = dateToMdy;
            this.load();
        }
        TripSideFormGridController.prototype.load = function () {
            var qry = 0;
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAll);
        };
        TripSideFormGridController.prototype.add = function (form) {
            this.model = this.newRow();
            this.modelCopy = null;
            ;
        };
        TripSideFormGridController.prototype.edit = function (model, form) {
            if (this.model && this.model.form && this.model.form.$dirty) {
                return;
            }
            this.model = model;
            this.modelCopy = angular.copy(model);
        };
        TripSideFormGridController.prototype.onFormInit = function (form) {
            this.model.form = form;
        };
        TripSideFormGridController.prototype.save = function (model, form) {
            form.$setPristine();
            this.ds.saveModel(EntityType.Trip, this.model, this.onAdd, this.onSave);
        };
        TripSideFormGridController.prototype.delete = function (model) {
            this.ds.deleteModel(EntityType.Trip, this.model, this.onDelete);
        };
        TripSideFormGridController.prototype.newRow = function () {
            var model = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            return model;
        };
        TripSideFormGridController.prototype.cancel = function () {
            if (this.modelCopy) {
                angular.copy(this.modelCopy, this.model);
            }
            this.model = null;
            this.modelCopy = null;
        };
        TripSideFormGridController.prototype.init = function (form) {
            this.model.form = form;
        };
        TripSideFormGridController.$inject = [
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
var Application;
(function (Application) {
    //import Services = Application.Services;
    var TripNavToFormController = (function () {
        function TripNavToFormController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.list = null;
            this.model = null;
            this.modelCopy = null;
            this.showForm = false;
            this.editMode = 0;
            this.onGetAll = function (trips) {
                _this.list = trips;
            };
            this.onAdd = function (model) {
                model.isNew = false;
                _this.list.unshift(model);
            };
            this.onSave = function (model) {
            };
            this.onDelete = function (model) {
            };
            $scope.dateToMdy = dateToMdy;
        }
        TripNavToFormController.prototype.$onInit = function () {
            //this.list = this.ds.list;
            this.load();
        };
        TripNavToFormController.prototype.load = function () {
            var qry = 0;
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAll);
        };
        TripNavToFormController.prototype.formInit = function (form) {
            this.model.form = form;
        };
        TripNavToFormController.prototype.add = function () {
            this.model = this.newRow();
            this.modelCopy = null;
            ;
            this.editMode = 1;
        };
        TripNavToFormController.prototype.edit = function (model) {
            this.model = model;
            this.modelCopy = angular.copy(model);
            this.editMode = 1;
        };
        TripNavToFormController.prototype.save = function (model) {
            this.ds.saveModel(EntityType.Trip, this.model, this.onAdd, this.onSave);
            this.model = this.modelCopy = null;
            this.editMode = 0;
        };
        TripNavToFormController.prototype.delete = function (model) {
            if (this.ds.deleteModel(EntityType.Trip, model, this.onDelete)) {
                // If Sync move the below to onDeleteTrip
                //
                this.list.splice(this.list.indexOf(model), 1);
                this.model = this.modelCopy = null;
                this.editMode = 0;
            }
        };
        TripNavToFormController.prototype.newRow = function () {
            var model = new TripModel();
            TripModel.onGet(model);
            return model;
        };
        TripNavToFormController.prototype.cancel = function () {
            if (this.modelCopy) {
                angular.copy(this.modelCopy, this.model);
            }
            this.model = null;
            this.modelCopy = null;
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
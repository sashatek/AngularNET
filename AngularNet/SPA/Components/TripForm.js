var Application;
(function (Application) {
    var TripFormController = (function () {
        function TripFormController($scope) {
            this.$scope = $scope;
            this.trip = new TripWorker();
        }
        TripFormController.prototype.save = function (model, form) {
            this.onSave({ model: model, form: form });
        };
        TripFormController.prototype.delete = function (model, form) {
            this.onDelete({ model: model });
        };
        TripFormController.prototype.$onInit = function () {
        };
        TripFormController.$inject = [
            "DataService",
            "$scope"
        ];
        return TripFormController;
    }());
    Application.TripFormController = TripFormController;
    Application.tripForm = {
        bindings: {
            model: "=",
            ds: '=',
            onCancel: '&',
            onSave: '&',
            onDelete: '&',
            formInit: '&',
            showDelete: "<"
        },
        controller: Application.TripFormController,
        templateUrl: urlApp + 'Component/TripForm'
    };
})(Application || (Application = {}));
//# sourceMappingURL=TripForm.js.map
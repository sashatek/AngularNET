var Application;
(function (Application) {
    var TripForm2Controller = (function () {
        //showDelete: boolean = false;
        //tripSort: any = ";
        //tripRev: boolean = false;
        function TripForm2Controller($scope) {
            var _this = this;
            this.$scope = $scope;
            this.sTest = "String from the form 2 controller";
            this.errorMessage = null;
            this.trip = new TripWorker();
            this.num = 7;
            this.onAddTrip = function (model) {
                model.isNew = false;
                _this.ds.trip.list.unshift(model);
                _this.ds.trip.model = model;
                _this.ds.trip.model = _this.trip.modelCopy = null;
            };
            this.onSaveTrip = function (model) {
                _this.trip.model = _this.trip.modelCopy = null;
            };
            this.trip = this.ds.trip;
        }
        TripForm2Controller.prototype.save = function (model, form) {
            form.$setPristine();
            this.ds.saveTrip(this.ds.trip.model, this.onAddTrip, this.onSaveTrip);
            //(<any>this).onSave({ model: model, form: form });
        };
        TripForm2Controller.prototype.saveNote = function (model, form) {
            form.$setPristine();
            this.ds.saveTrip(this.trip.model, this.onAddTrip, this.onSaveTrip);
        };
        TripForm2Controller.prototype.delete = function (model, form) {
            this.ds.deleteTrip(model, this.onDelete);
            this.trip.list.splice(this.trip.list.indexOf(model), 1);
        };
        TripForm2Controller.prototype.onDelete = function (model) {
        };
        TripForm2Controller.prototype.$onInit = function () {
        };
        TripForm2Controller.$inject = [
            "DataService",
            "$scope"
        ];
        return TripForm2Controller;
    }());
    Application.TripForm2Controller = TripForm2Controller;
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
//# sourceMappingURL=TripForn2.js.map

module Application {

    export class TripFormController {

        static $inject = [
            "DataService",
            "$scope"
        ];

        trip: TripWorker = new TripWorker();
        private ds: Services.DataService;
        private onSave: Function;
        private onDelete: Function;

        constructor(private $scope){
        }

        save(model, form) {
            this.onSave({ model: model, form: form });
        }

        delete(model, form) {
            this.onDelete({ model: model});
        }

        $onInit() {
        }
    }

    export var tripForm: angular.IComponentOptions = {
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

}
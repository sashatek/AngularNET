
module Application {

    export class TripFormController {

        static $inject = [
            "DataService",
            "$scope"
        ];

        sTest: string = "String from the form controller";
        errorMessage: string = null;
        trip: TripWorker = new TripWorker();
        num: number = 7;
        $ctrl: any;
        private ds: Services.DataService;
        private onSave: Function;
        private onDelete: Function;

        //showDelete: boolean = false;

        //tripSort: any = ";
        //tripRev: boolean = false;

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

module Application {

    export class TripForm2Controller {

        static $inject = [
            "DataService",
            "$scope"
        ];

        sTest: string = "String from the form 2 controller";
        errorMessage: string = null;
        trip: TripWorker = new TripWorker();
        num: number = 7;
        $ctrl: any;
        private ds: Services.DataService;

        //showDelete: boolean = false;

        //tripSort: any = ";
        //tripRev: boolean = false;

        constructor(private $scope) {
            this.trip = this.ds.trip;
        }

        save(model, form) {
            form.$setPristine();
            this.ds.saveTrip(this.ds.trip.model, this.onAddTrip, this.onSaveTrip);

            //(<any>this).onSave({ model: model, form: form });
        }

        saveNote(model, form) {
            form.$setPristine();
            this.ds.saveTrip(this.trip.model, this.onAddTrip, this.onSaveTrip);
        }

        onAddTrip = (model: TripModel) => {
            model.isNew = false;
            this.ds.trip.list.unshift(model);
            this.ds.trip.model = model;
            this.ds.trip.model = this.trip.modelCopy = null;
        }

        onSaveTrip = (model: TripModel) => {
            this.trip.model = this.trip.modelCopy = null;
        }

        delete(model, form) {
            this.ds.deleteTrip(model, this.onDelete);
            this.trip.list.splice(this.trip.list.indexOf(model), 1);
        }

        onDelete(model: TripModel) {
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
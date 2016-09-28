module Application {

    //import Services = Application.Services;

    export class TripNavToFormController {

        static $inject = [
            "$scope"
        ];

        trip: TripWorker = new TripWorker();
        showForm: boolean = false;
        editMode: number = 0;
        private ds: Services.DataService;

        constructor(private $scope) {
            this.trip = this.ds.trip;
            $scope.dateToMdy = dateToMdy;
            this.load();
        }

        load() {
            var qry = 0;
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAllTrips);
        }

        formInit(form) {
            this.trip.model.form = form;
        }

        onGetAllTrips = (trips: TripModel[]) => {
            this.trip.list = trips;
        }

        addTrip() {
            this.trip.model = this.newTrip();
            this.trip.modelCopy = null;;
            this.editMode = 1;
        }

        editTrip(model, form) {
            this.trip.model = model;
            this.trip.modelCopy = angular.copy(model);
            this.editMode = 1;
        }


        saveTrip(model) {
            this.ds.saveModel(EntityType.Trip, this.trip.model, this.onAddTrip, this.onSaveTrip);
            this.trip.model = this.trip.modelCopy = null;
            this.editMode = 0;
        }

        onAddTrip = (model: TripModel) => {
            model.isNew = false;
            this.trip.list.unshift(model);
        }

        onSaveTrip = (model: TripModel) => {

        }

        deleteTrip(model) {
            if (this.ds.deleteModel(EntityType.Trip, model, this.onDeleteTrip)) {
                // If Sync move the below to onDeleteTrip
                //
                this.trip.list.splice(this.trip.list.indexOf(model), 1);
                this.trip.model = this.trip.modelCopy = null;
                this.editMode = 0;
            }
        }

        onDeleteTrip = (model) => {
        }

        newTrip() {
            var model = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            return model;
        }


        cancelTrip() {
            if (this.trip.modelCopy) {
                angular.copy(this.trip.modelCopy, this.trip.model);
            }
            this.trip.model = null;
            this.trip.modelCopy = null;
            this.editMode = 0;
        }
    }

    export var tripNavToForm: angular.IComponentOptions = {
        bindings: {
            ds: '=',
            formInit: '&'
        },
        controller: Application.TripNavToFormController,
        controllerAs: 'gc',
        templateUrl: urlApp + 'Component/TripNavToForm'
    };
}

                        
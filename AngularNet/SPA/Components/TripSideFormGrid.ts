
module Application {

    import Services = Application.Services;

    export class TripSideFormGridController {

        static $inject = [
            "DataService",
            "$scope"
        ];

        trip: TripWorker = new TripWorker();
        showForm: boolean = false;
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

        onGetAllTrips = (trips: TripModel[]) => {
            this.trip.list = trips;
            this.newTrip();
        }

        addTrip() {
            this.trip.model = this.newTrip();
            this.trip.modelCopy = null;;
        }

        editTrip(model, form) {
            if (this.trip.model && this.trip.model.form && this.trip.model.form.$dirty) {
                return;
            }
            this.trip.model = model;
            this.trip.modelCopy = angular.copy(model);
        }

        onFormInit(form) {
            this.trip.model.form = form;
        }

        saveTrip(model,form) {
            form.$setPristine();
            this.ds.saveModel(EntityType.Trip, this.trip.model, this.onAddTrip, this.onSaveTrip);
        }

        onAddTrip = (model: TripModel) => {
            model.isNew = false;
            this.trip.list.unshift(model);
            this.trip.model = this.trip.modelCopy = null;
        }

        onSaveTrip = (model: TripModel) => {
            this.trip.model = this.trip.modelCopy = null;
        }

  
        deleteTrip(model) {
            this.ds.deleteModel(EntityType.Trip, this.trip.model, this.onDeleteTrip);
        }

        onDeleteTrip = (model) => {
            var index = this.trip.list.indexOf(model);
            this.trip.list.splice(index, 1);
            this.trip.model = null;
            this.trip.modelCopy = null;
        }

        newTrip() {
            var model = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            return model;
        }


        cancel() {
            if (this.trip.modelCopy) {
                angular.copy(this.trip.modelCopy, this.trip.model);
            }
            this.trip.model = null;
            this.trip.modelCopy = null;
        }

        init(form) {
            this.trip.model.form = form;
        }
    }

    export var tripSideFormGrid: angular.IComponentOptions = {
        bindings: {
            ds: '=',
            formInit: '&'
        },
        controller: Application.TripSideFormGridController,
        controllerAs: 'gc',
        templateUrl: urlApp + 'Component/TripSideFormGrid'
    };
}

                      
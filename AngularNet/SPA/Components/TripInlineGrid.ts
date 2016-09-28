module Application {

    import Services = Application.Services;

    export class TripInlineInlineController {

        static $inject = [
            "$scope"
        ];

        trip: TripWorker = new TripWorker();
        model: TripModel = null;
        modelCopy: TripModel = null;
        form: any = null;
        private ds: Services.DataService;

        constructor(private $scope) {
            this.trip = this.ds.trip;
            $scope.dateToMdy = dateToMdy;
            this.load();
        }

        load() {
            var qry = 0;
            this.trip.list = [];
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAllTrips);
        }

        onGetAllTrips = (trips: TripModel[]) => {
            this.newTrip();
        }

        addTrip() {
            this.model = this.newTrip();
            this.modelCopy = null;;
        }

        editTrip(model, form) {
            if (this.model && this.form.$dirty) {
                return;
            }
            this.model = model;
            this.modelCopy = angular.copy(model);
            this.form = form;
        }

        saveTrip(model: TripModel, form) {
            if (model.isNew) {
                this.newTrip();
            }
            model.form = form;
            this.trip.model = model;
            this.ds.saveModel(EntityType.Trip, model, this.onAddTrip, this.onSaveTrip);

            model.form.$setPristine();
            this.model = this.modelCopy = null;
        }

        onAddTrip = (model: TripModel) => {
            model.isNew = false;
        }

        onSaveTrip = (model: TripModel) => {
        }

          deleteTrip(model, form) {
              if (this.ds.deleteModel(EntityType.Trip, model, this.onDeleteTrip)) {
                this.trip.list.splice(this.trip.list.indexOf(model), 1);
                this.model = this.modelCopy = null;
           }
        }

        onDeleteTrip = (model) => {
        }


        newTrip() {
            var model: TripModel = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            this.trip.list.push(model);
            return model;
        }

        cancel(model, form) {
            if (this.modelCopy) {
                angular.copy(this.modelCopy, this.model);
            }
            form.$setPristine();
            this.model = null;
            this.modelCopy = null;
        }


    }

    export var tripInlineGrid: angular.IComponentOptions = {
        bindings: {
            ds: '=',
            formInit: '&'
        },
        controller: Application.TripInlineInlineController,
        controllerAs: 'gc',
        templateUrl: urlApp + 'Component/TripInlineGrid'
    };
}

                        
 




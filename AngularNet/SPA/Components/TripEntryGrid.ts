
module Application {

    class TripGridController {

        static $inject = [
            "$scope"
        ];

        trip: TripWorker = new TripWorker();
        private ds: Application.Services.DataService;
        private entityType : EntityType = EntityType.Trip;

        constructor(private $scope) {
            this.trip = this.ds.trip;
            this.load();
        }

        load() {
            var qry = 0;
            this.trip.list = [];
            this.ds.getAllModels(this.entityType, qry, this.onGetAllTrips);
        }

        onGetAllTrips = (trips: TripModel[]) => {
            this.newTrip();
        }

        //onGetTrip = (trip: TripModel) => {
        //}

        saveTrip(model: TripModel, form) {
            this.ds.saveModel(this.entityType, model, this.onAddTrip, this.onSaveTrip);
            form.$setPristine();
            if (model.isNew) {
                this.newTrip();
            }
        }

        onAddTrip = (model: TripModel) => {
            model.isNew = false;
        }

        onSaveTrip = (model: TripModel) => {
        }

        deleteTrip(model, form) {
            if (this.ds.deleteModel(this.entityType, model, this.onDeleteTrip)) {
                this.trip.list.splice(this.trip.list.indexOf(model), 1);
            }
        }


        onDeleteTrip = (model) => {
        }


        newTrip():void {
            var model = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            this.trip.list.push(model);
        }
    }

    export var tripGridComponent: angular.IComponentOptions = {
        bindings: {
            ds: '<',
            search: "<",
            formInit: '&'
        },
        controller: TripGridController,
        controllerAs: 'gc',
        templateUrl: urlApp + 'Component/TripEntryGrid'
    };
}

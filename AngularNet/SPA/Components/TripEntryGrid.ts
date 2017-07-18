
module Application {

    class TripGridController {

        static $inject = [
            "$scope"
        ];

        list: TripModel[];
        //model : TripModel;
        private ds: Application.Services.DataService;
        private entityType: EntityType = EntityType.Trip;

        constructor(private $scope) {
        }
        $onInit() {
            this.load();
        }
        load() {
            var qry = 0;
            this.list = [];
            this.ds.getAllModels(this.entityType, qry, this.onGetAll);
        }

        onGetAll = (data: TripModel[]) => {
            this.list = data;
            this.addLine();
        }

        //onGet = (data: YourModel) => {
        //}

        save(model: TripModel, form) {
            if (model.isNew) {
                //model.Id = 1;
            }
            this.ds.saveModel(this.entityType, model, this.onAdd, this.onSave);
            form.$setPristine();
            if (model.isNew) {
                this.addLine();
            }
        }

        onAdd = (model: TripModel) => {
            model.isNew = false;
        }

        onSave = (model: TripModel) => {
        }

        delete(model, form) {
            if (this.ds.deleteModel(this.entityType, model, this.onDelete)) {
                this.list.splice(this.list.indexOf(model), 1);
            }
        }


        onDelete = (model: TripModel) => {
        }


        addLine() {
            var model = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            this.list.push(model);
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

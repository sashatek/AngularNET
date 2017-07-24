module Application {

    //import Services = Application.Services;

    export class TripNavToFormController {

        static $inject = [
            "$scope"
        ];

        list: TripModel[] = null;
        model: TripModel = null;
        modelCopy: TripModel = null;
        showForm: boolean = false;
        editMode: number = 0;
        private ds: Services.DataService;

        constructor(private $scope) {
            $scope.dateToMdy = dateToMdy;
        }

        $onInit() {
            //this.list = this.ds.list;
            this.load();
        }

        load() {
            var qry = 0;
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAll);
        }

        formInit(form) {
            this.model.form = form;
        }

        onGetAll = (trips: TripModel[]) => {
            this.list = trips;
        }

        add() {
            this.model = this.newRow();
            this.modelCopy = null;;
            this.editMode = 1;
        }

        edit(model) {
            this.model = model;
            this.modelCopy = angular.copy(model);
            this.editMode = 1;
        }


        save(model) {
            this.ds.saveModel(EntityType.Trip, this.model, this.onAdd, this.onSave);
            this.model = this.modelCopy = null;
            this.editMode = 0;
        }

        onAdd = (model: TripModel) => {
            model.isNew = false;
            this.list.unshift(model);
        }

        onSave = (model: TripModel) => {

        }

        delete(model) {
            if (this.ds.deleteModel(EntityType.Trip, model, this.onDelete)) {
                // If Sync move the below to onDeleteTrip
                //
                this.list.splice(this.list.indexOf(model), 1);
                this.model = this.modelCopy = null;
                this.editMode = 0;
            }
        }

        onDelete = (model) => {
        }

        newRow() {
            var model = new TripModel();
            TripModel.onGet(model);
            return model;
        }


        cancel() {
            if (this.modelCopy) {
                angular.copy(this.modelCopy, this.model);
            }
            this.model = null;
            this.modelCopy = null;
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

                        
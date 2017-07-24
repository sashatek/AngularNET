
module Application {

    import Services = Application.Services;

    export class TripSideFormGridController {

        static $inject = [
            "$scope"
        ];

        list: TripModel[] = null;
        model: TripModel = null;
        modelCopy: TripModel = null;
        showForm: boolean = false;
        private ds: Services.DataService;

        constructor(private $scope) {
            $scope.dateToMdy = dateToMdy;
        }

        $onInit() {
            //this.list = this.ds.trip.list;
            this.load();
        }

        
        load() {
            var qry = 0;
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAll);
        }

        onGetAll = (data: TripModel[]) => {
            this.list = data;
            this.newRow();
        }

        add(form) {
            this.model = this.newRow();
            this.modelCopy = null;;
        }

        edit(model, form) {
            if (this.model && this.model.form && this.model.form.$dirty) {
                return;
            }
            this.model = model;
            this.modelCopy = angular.copy(model);
        }

        onFormInit(form) {
            this.model.form = form;
        }

        save(model,form) {
            form.$setPristine();
            this.ds.saveModel(EntityType.Trip, this.model, this.onAdd, this.onSave);
        }

        onAdd = (model: TripModel) => {
            model.isNew = false;
            this.list.unshift(model);
            this.model = this.modelCopy = null;
        }

        onSave = (model: TripModel) => {
            if (model === this.model) {
                this.model = this.modelCopy = null;
            }
        }


        delete(model) {
            this.ds.deleteModel(EntityType.Trip, this.model, this.onDelete);
        }

        onDelete = (model) => {
            var index = this.list.indexOf(model);
            this.list.splice(index, 1);
            this.model = null;
            this.modelCopy = null;
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
        }

        init(form) {
            this.model.form = form;
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

                      
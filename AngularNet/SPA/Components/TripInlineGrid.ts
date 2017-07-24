module Application {

    import Services = Application.Services;

    export class TripInlineInlineController {

        static $inject = [
            "$scope"
        ];

        list: TripModel[] = null;
        model: TripModel = null;
        modelCopy: TripModel = null;
        form: any = null;
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
            this.list = [];
            this.ds.getAllModels(EntityType.Trip, qry, this.onGetAll);
        }

        onGetAll = (data: TripModel[]) => {
            this.list = data;
            this.newRow();
        }

        add() {
            this.model = this.newRow();
            this.modelCopy = null;;
        }

        edit(model, form) {
            if (this.model && this.form.$dirty) {
                return;
            }
            this.model = model;
            this.modelCopy = angular.copy(model);
            this.form = form;
        }

        save(model: TripModel, form) {
            if (model.isNew) {
                this.newRow();
            }
            model.form = form;
            this.model = model;
            this.ds.saveModel(EntityType.Trip, model, this.onAdd, this.onSave);

            model.form.$setPristine();
            this.model = this.modelCopy = null;
        }

        onAdd = (model: TripModel) => {
            model.isNew = false;
        }

        onSave = (model: TripModel) => {
        }

          delete(model, form) {
              if (this.ds.deleteModel(EntityType.Trip, model, this.onDelete)) {
                this.list.splice(this.list.indexOf(model), 1);
                this.model = this.modelCopy = null;
           }
        }

        onDelete = (model) => {
        }


        newRow() {
            var model: TripModel = new TripModel();
            TripModel.onGet(model);
            this.list.push(model);
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

                        
 







module Application {

    import Services = Application.Services;

    export class TripPopFormController {

        static $inject = [
            "$scope",
            "$uibModalInstance",
            "model",
            "ds"
        ];

        sTest: string = "String from the Trip Pop Form controller";
        errorMessage: string = null;
        trip: TripWorker = new TripWorker();
        //private ds: Services.DataService;

        constructor(private $scope, private $modalInstance, private model, private ds : Services.DataService) {
            this.trip = this.ds.trip;
            this.trip.modelCopy = angular.copy(model);
        }


        selTrans(model, item) {
            var a = 0;
        }

        formInit(form) {
            this.model.form = form;
        }
        saveTrip(model,form) {
            form.$setPristine();
            this.ds.saveModel(EntityType.Trip, this.model, this.onAddTrip, this.onSaveTrip);
            this.$modalInstance.close(this.model);
        }

        onAddTrip = (model: TripModel) => {
}

        onSaveTrip = (model: TripModel) => {
        }

        cancel() {
            angular.copy(this.trip.modelCopy, this.model);
            this.$modalInstance.dismiss('cancel');
        }

    }
}




module Application {

    import Services = Application.Services;

    export class TripPopupGridController {

        static $inject = [
            "$scope",
            "$uibModal"
        ];

        sTest: string = "String from the Trip ListPopController";
        errorMessage: string = null;
        trip: TripWorker = new TripWorker();
        private ds: Services.DataService;

        constructor(private $scope, private $modal) {
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
            var model = this.newTrip();
            this.editTrip(model);
        }


        editTrip = (model) => {
            //ver = model.icdInfo.ICDVersion;
            //$scope.model.drops = $scope.s.data;

            var that = this;
            var modalInstance = that.$modal.open({
                templateUrl: urlApp + 'Partial/TripPopForm',
                controller: Application.TripPopFormController,
                controllerAs : 'fc',
                resolve: {
                    model: function () {
                        return model;
                    },
                    ds: function () {
                        return that.ds;
                    }
                },
                backdrop: "static",
                size: "sm",
                animation: true,
                windowClass: "modal fade in"
            });


            modalInstance.result.then(function (model) {
                if (model.isNew) {
                    model.isNew = false;
                    that.trip.list.unshift(model);
                }
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        deleteTrip(model) {
            this.ds.deleteModel(EntityType.Trip, model, this.onDeleteTrip);
        }

        onDeleteTrip = (model) => {
            var index = this.trip.list.indexOf(model);
            this.trip.list.splice(index, 1);
        }

         newTrip() {
            var model = new TripModel();
            model.isNew = true;
            TripModel.onGet(model);
            return model;
        }
    }


    export var tripPopupGrid: angular.IComponentOptions = {
        bindings: {
            ds: '=',
            formInit: '&'
        },
        controller: Application.TripPopupGridController,
        controllerAs: 'gc',
        templateUrl: urlApp + 'Component/TripPopupGrid'
    };
}

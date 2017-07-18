enum EntityType {
    Trip,
    TransportationMode,
}

interface IDataServiceConfig {
    entityType: EntityType;
    url: string;
    varName: string;
    pkField: string;
    parent?: string;
    parentPkField?: string;
    templateUrl? : string;
}

module Application.Services {

    export class DataService {

        ref: any = {};
        errorMessage: string = null;
        sTest: string = "Good message from Data Service";
        state: any = {};
        configs: IDataServiceConfig[] = [
            { entityType: EntityType.Trip, url: "api/Trip", varName: "trip", pkField: "tripId" },
        ];
        trip: TripWorker = new TripWorker();

        constructor(private http: ng.IHttpService, private $location: ng.ILocationService) {
            this.state.viewMode = 0;
        }


        getRefs(onCallBack) {
            var urlBase = urlApp + 'api/Ref';
            this.http.get(urlBase)
                .then((response) => {
                    this.ref = response.data;
                    if (onCallBack) {
                        onCallBack(response.data);
                    }
                })
                .catch((response) => {
                    this.errorMessage = 'Unable to get reference data: ' + response.data.Message;
                    alert(this.errorMessage);


                });
        };

        //Lookups
        //
        lookupArpt(term) {
            var urlLookupArpt: string = urlApp + "api/Lookup/Iata";
            return this.http.get(urlLookupArpt + "/" + term)
                .then(response => response.data);
        };


        getAllModels(etype: EntityType, qry, callBack: Function = angular.noop) {
            var that = this;
            var config = this.configs[etype];
            this.http.get(urlApp + config.url + "/GetAll/" + qry)
                .then((response) => {
                    this[config.varName].list = response.data;
                    eval(EntityType[etype] + "Model.onGetAll(that[config.varName].list)");
                    callBack(this[config.varName].list);
                })
                .catch((response) => {
                    this.errorMessage = "Unable to get " + EntityType[etype] + " data: " + response.data.Message;
                    alert(this.errorMessage);
                });
        }

        getModel(etype: EntityType, id, callBack: Function = angular.noop) {
            var that = this;
            var config = this.configs[etype];
            this.http.get(urlApp + config.url + '/' + id)
                .then((response) => {
                    this[config.varName].model = response.data;
                    eval(EntityType[etype] + "Model.onGet(that[config.varName].model)");
                    callBack(this[config.varName].model);
                })
                .catch((response) => {
                    this.errorMessage = "Unable to get " + EntityType[etype] + " data: " + response.data.Message;
                    alert(this.errorMessage);
                });
        }

        saveModel(etype: EntityType, model,
            addCallBack: Function = angular.noop,
            updateCallBack: Function = angular.noop) {
            if (model.isNew) {
                this.addModel(etype, model, addCallBack);
            } else {
                this.updateModel(etype, model, updateCallBack);
            }
        }

        addModel(etype: EntityType, model, callBack) {
            var config = this.configs[etype];
            eval(EntityType[etype] + "Model.onSave(model)");
            if (config.parentPkField) {
                model[config.parentPkField] = this[config.parent][config.parentPkField]; // If master-detail
            }
            this.http.post(urlApp + config.url, model)
                .then((response) => {
                    if (config.pkField) {
                        model[config.pkField] = response.data[config.pkField]; // Only if auto PK
                    }
                    callBack(model);
                })
                .catch((response) => {
                    this.errorMessage = "Unable to add " + EntityType[etype] + " data: " + response.data.Message;
                    alert(this.errorMessage);
                });
        }

        updateModel(etype: EntityType,
            model, callBack: Function = angular.noop) {
            var config = this.configs[etype];
            eval(EntityType[etype] + "Model.onSave(model)");
            this.http.put(urlApp + config.url + '/' + model[config.pkField], model)
                .then((response) => {
                    callBack(model);
                })
                .catch((response) => {
                    this.errorMessage = "Unable to save " + EntityType[etype] + " data: " + response.data.Message;
                    alert(this.errorMessage);
                });
        }

        deleteModel(etype: EntityType, model, callBack: Function = angular.noop): boolean {
            var that = this;
            var config = this.configs[etype];
            if (!confirm('Are you sure you want to delete?')) {
                return false;
            }
            this.http.delete(urlApp + config.url + '/' + model[config.pkField])
                .then((response) => {
                    callBack(model);
                })
                .catch((response) => {
                    this.errorMessage = "Unable to delete " + EntityType[etype] + " data: " + response.data.Message;
                    alert(this.errorMessage);
                });
            return true;
        };






        //// Short Trip Service calls
        ////
        //trip: TripWorker = new TripWorker();
        //private urlTrip: string = urlApp + 'api/Trip';

        //getAllTrips = function (id) {
        //    return this.http.get(this.urlTrip + "/GetAll/" + id);
        //};

        //getTrip = function (id) {
        //    return this.http.get(this.urlTrip + '/' + id);
        //};

        //saveTrip = function (id, model) {
        //    //model.userId = userId;
        //    return this.http.put(this.urlTrip + '/' + id, model);
        //};

        //addTrip = function (model) {
        //    //model.userId = userId;
        //    return this.http.post(this.urlTrip, model);
        //};

        //deleteTrip = function (id) {
        //    return this.http.delete(this.urlTrip + '/' + id);
        //};


        // Full version of data the service with callbacks
        //
        private urlTrip: string = urlApp + 'api/Trip';

        getAllTrips(qry, callBack: Function = angular.noop) {
            this.http.get(this.urlTrip + "/GetAll/" + qry)
                .then((response) => {
                    this.trip.list = <TripModel[]>response.data;
                    TripModel.onGetAll(this.trip.list);
                    callBack(this.trip.list);
                })
                .catch((response) => {
                    this.errorMessage = 'Unable to get Trips data: ' + response.data.Message;
                    alert(this.errorMessage);
                });
        }

        getTrip(id, callBack: Function = angular.noop) {
            this.http.get(this.urlTrip + '/' + id)
                .then((response) => {
                    this.trip.model = <TripModel>response.data;
                    TripModel.onGet(this.trip.model);
                    callBack(this.trip.model);
                })
                .catch((response) => {
                    this.errorMessage = 'Unable to get Trip data: ' + response.data.Message;
                    alert(this.errorMessage);
                });
        }

        saveTrip(model: TripModel, callBackAdd: Function = angular.noop, callBackSave: Function = angular.noop) {
            TripModel.onSave(model);
            if (model.isNew) {
                //model.parent.tripId = parent.tripId // If master-detail
                this.http.post(this.urlTrip, model)
                    .then((response) => {
                        var data = <TripModel>response.data;
                        model.tripId = data.tripId; // Only if auto PK
                        callBackAdd(model);
                    })
                    .catch((response) => {
                        this.errorMessage = 'Unable to add Trip data: ' + response.data.Message;
                        alert(this.errorMessage);
                    });
            } else {
                this.http.put(this.urlTrip + '/' + model.tripId, model)
                    .then((response) => {
                        callBackSave(model);
                    })
                    .catch((response) => {
                        this.errorMessage = 'Unable to save Trip data: ' + response.data.Message;
                        alert(this.errorMessage);
                    });
            }
        }


        deleteTrip(model: TripModel, callBack: Function = angular.noop): boolean {
            if (!confirm('Are you sure you want to delete?')) {
                return false;
            }
            this.http.delete(this.urlTrip + '/' + model.tripId)
                .then((response) => {
                    callBack(model);
                })
                .catch((response) => {
                    this.errorMessage = 'Unable to delete Trip data: ' + response.data.Message;
                    alert(this.errorMessage);
                });
            return true;
        };
    }
}
    

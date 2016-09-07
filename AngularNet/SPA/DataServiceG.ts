enum EntityType {
    Trip,
    TransportationMode,
}

interface IDataServiceConfig {
    entityType: EntityType;
    url: string;
    varName: string;
    pkField : string;
    parent?: string;
    parentPkField? : string;
}

module Application.Services {

    export class DataServiceG {

        ref: any = {};
        errorMessage: string = null;
        sTest: string = "Good message from Data Service";
        state: any = {};
        configs : IDataServiceConfig[] = [
            { entityType: EntityType.Trip, url: "api/Trip", varName: "trip", pkField: "tripId" },
        ];


        constructor(private http: ng.IHttpService, private $location: ng.ILocationService) {
            this.state.viewMode = 0;
        }


        getRefs = function (onCallBack) {
            var urlBase = urlApp + 'api/Ref';
            this.http.get(urlBase)
                .success((data) => {
                    this.ref = data;
                    if (onCallBack) {
                        onCallBack(data);
                    }
                })
                .error((error) => {
                    this.errorMessage = 'Unable to get reference data: ' + error.Message;
                    alert(this.errorMessage);

                });
        };


        //Lookups
        //
        urlLookArpt: string = urlApp + 'api/Lookup/Iata';
        lookArpt = function (term) {
            return this.http.get(this.urlLookArpt + "/" + term)
                .then(function (response) {
                    return response.data;
                });
        };


  
        trip: TripWorker = new TripWorker();

        getAllModels(etype: EntityType, qry, callBack: Function = angular.noop) {
            var that = this;
            var config = this.configs[etype];
            this.http.get(urlApp + config.url + "/GetAll/" + qry)
                .success((data) => {
                    this[config.varName].list = data;
                    eval(EntityType[etype] + "Model.onGetAll(that[config.varName].list)");
                    callBack(this[config.varName].list);
                })
                .error((error) => {
                    this.errorMessage = "Unable to get " + EntityType[etype] + " data: " + error.Message;
                    alert(this.errorMessage);
                });
        }

        getModel(etype: EntityType,id, callBack: Function = angular.noop) {
            var that = this;
            var config = this.configs[etype];
            this.http.get(urlApp + config.url + '/' + id)
                .success((data) => {
                    this[config.varName].model = data;
                    eval(EntityType[etype] + "Model.onGet(that[config.varName].model)");
                    callBack(this[config.varName].model);
                })
                .error((error) => {
                    this.errorMessage = "Unable to get " + EntityType[etype] + " data: " + error.Message;
                    alert(this.errorMessage);
                });
        }

        saveModel(etype: EntityType,model, callBackAdd: Function = angular.noop, callBackSave: Function = angular.noop) {
            var that = this;
            var config = this.configs[etype];
            eval(EntityType[etype] + "Model.onSave(model)");
            if (model.isNew) {
                if (config.parentPkField) {
                    model[config.parentPkField] = this[config.parent][config.parentPkField]; // If master-detail
                }
                this.http.post(urlApp + config.url, model)
                    .success((data) => {
                        if (config.pkField) {
                            model[config.pkField] = data[config.pkField]; // Only if auto PK
                        }
                        callBackAdd(model);
                    })
                    .error((error) => {
                        this.errorMessage = "Unable to add " + EntityType[etype] + " data: " + error.Message;
                        alert(this.errorMessage);
                    });
            } else {
                this.http.put(urlApp + config.url + '/' + model[config.pkField], model)
                    .success((data) => {
                        callBackSave(model);
                    })
                    .error((error) => {
                        this.errorMessage = "Unable to save " + EntityType[etype] + " data: " + error.Message;
                        alert(this.errorMessage);
                    });
            }
        }


        deleteModel(etype: EntityType,model, callBack: Function = angular.noop): boolean {
            var that = this;
            var config = this.configs[etype];
            if (!confirm('Are you sure you want to delete?')) {
                return false;
            }
            this.http.delete(urlApp + config.url + '/' + model[config.pkField])
                .success((data) => {
                    callBack(model);
                })
                .error((error) => {
                    this.errorMessage = "Unable to delete " + EntityType[etype] + " data: " + error.Message;
                    alert(this.errorMessage);
                });
            return true;
        };
    }
}


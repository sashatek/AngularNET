var EntityType;
(function (EntityType) {
    EntityType[EntityType["Trip"] = 0] = "Trip";
    EntityType[EntityType["TransportationMode"] = 1] = "TransportationMode";
})(EntityType || (EntityType = {}));
var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var DataService = (function () {
            function DataService(http, $location) {
                this.http = http;
                this.$location = $location;
                this.ref = {};
                this.errorMessage = null;
                this.sTest = "Good message from Data Service";
                this.state = {};
                this.configs = [
                    { entityType: EntityType.Trip, url: "api/Trip", varName: "trip", pkField: "tripId" },
                ];
                this.trip = new TripWorker();
                this.getRefs = function (onCallBack) {
                    var _this = this;
                    var urlBase = urlApp + 'api/Ref';
                    this.http.get(urlBase)
                        .success(function (data) {
                        _this.ref = data;
                        if (onCallBack) {
                            onCallBack(data);
                        }
                    })
                        .error(function (error) {
                        _this.errorMessage = 'Unable to get reference data: ' + error.Message;
                        alert(_this.errorMessage);
                    });
                };
                //Lookups
                //
                this.urlLookArpt = urlApp + 'api/Lookup/Iata';
                this.lookArpt = function (term) {
                    return this.http.get(this.urlLookArpt + "/" + term)
                        .then(function (response) {
                        return response.data;
                    });
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
                this.urlTrip = urlApp + 'api/Trip';
                this.state.viewMode = 0;
            }
            DataService.prototype.getAllModels = function (etype, qry, callBack) {
                var _this = this;
                if (callBack === void 0) { callBack = angular.noop; }
                var that = this;
                var config = this.configs[etype];
                this.http.get(urlApp + config.url + "/GetAll/" + qry)
                    .success(function (data) {
                    _this[config.varName].list = data;
                    eval(EntityType[etype] + "Model.onGetAll(that[config.varName].list)");
                    callBack(_this[config.varName].list);
                })
                    .error(function (error) {
                    _this.errorMessage = "Unable to get " + EntityType[etype] + " data: " + error.Message;
                    alert(_this.errorMessage);
                });
            };
            DataService.prototype.getModel = function (etype, id, callBack) {
                var _this = this;
                if (callBack === void 0) { callBack = angular.noop; }
                var that = this;
                var config = this.configs[etype];
                this.http.get(urlApp + config.url + '/' + id)
                    .success(function (data) {
                    _this[config.varName].model = data;
                    eval(EntityType[etype] + "Model.onGet(that[config.varName].model)");
                    callBack(_this[config.varName].model);
                })
                    .error(function (error) {
                    _this.errorMessage = "Unable to get " + EntityType[etype] + " data: " + error.Message;
                    alert(_this.errorMessage);
                });
            };
            DataService.prototype.saveModel = function (etype, model, callBackAdd, callBackSave) {
                var _this = this;
                if (callBackAdd === void 0) { callBackAdd = angular.noop; }
                if (callBackSave === void 0) { callBackSave = angular.noop; }
                var that = this;
                var config = this.configs[etype];
                eval(EntityType[etype] + "Model.onSave(model)");
                if (model.isNew) {
                    if (config.parentPkField) {
                        model[config.parentPkField] = this[config.parent][config.parentPkField]; // If master-detail
                    }
                    this.http.post(urlApp + config.url, model)
                        .success(function (data) {
                        if (config.pkField) {
                            model[config.pkField] = data[config.pkField]; // Only if auto PK
                        }
                        callBackAdd(model);
                    })
                        .error(function (error) {
                        _this.errorMessage = "Unable to add " + EntityType[etype] + " data: " + error.Message;
                        alert(_this.errorMessage);
                    });
                }
                else {
                    this.http.put(urlApp + config.url + '/' + model[config.pkField], model)
                        .success(function (data) {
                        callBackSave(model);
                    })
                        .error(function (error) {
                        _this.errorMessage = "Unable to save " + EntityType[etype] + " data: " + error.Message;
                        alert(_this.errorMessage);
                    });
                }
            };
            DataService.prototype.deleteModel = function (etype, model, callBack) {
                var _this = this;
                if (callBack === void 0) { callBack = angular.noop; }
                var that = this;
                var config = this.configs[etype];
                if (!confirm('Are you sure you want to delete?')) {
                    return false;
                }
                this.http.delete(urlApp + config.url + '/' + model[config.pkField])
                    .success(function (data) {
                    callBack(model);
                })
                    .error(function (error) {
                    _this.errorMessage = "Unable to delete " + EntityType[etype] + " data: " + error.Message;
                    alert(_this.errorMessage);
                });
                return true;
            };
            ;
            DataService.prototype.getAllTrips = function (qry, callBack) {
                var _this = this;
                if (callBack === void 0) { callBack = angular.noop; }
                this.http.get(this.urlTrip + "/GetAll/" + qry)
                    .success(function (data) {
                    _this.trip.list = data;
                    TripModel.onGetAll(_this.trip.list);
                    callBack(_this.trip.list);
                })
                    .error(function (error) {
                    _this.errorMessage = 'Unable to get Trips data: ' + error.Message;
                    alert(_this.errorMessage);
                });
            };
            DataService.prototype.getTrip = function (id, callBack) {
                var _this = this;
                if (callBack === void 0) { callBack = angular.noop; }
                this.http.get(this.urlTrip + '/' + id)
                    .success(function (data) {
                    _this.trip.model = data;
                    TripModel.onGet(_this.trip.model);
                    callBack(_this.trip.model);
                })
                    .error(function (error) {
                    _this.errorMessage = 'Unable to get Trip data: ' + error.Message;
                    alert(_this.errorMessage);
                });
            };
            DataService.prototype.saveTrip = function (model, callBackAdd, callBackSave) {
                var _this = this;
                if (callBackAdd === void 0) { callBackAdd = angular.noop; }
                if (callBackSave === void 0) { callBackSave = angular.noop; }
                TripModel.onSave(model);
                if (model.isNew) {
                    //model.parent.tripId = parent.tripId // If master-detail
                    this.http.post(this.urlTrip, model)
                        .success(function (data) {
                        model.tripId = data.tripId; // Only if auto PK
                        callBackAdd(model);
                    })
                        .error(function (error) {
                        _this.errorMessage = 'Unable to add Trip data: ' + error.Message;
                        alert(_this.errorMessage);
                    });
                }
                else {
                    this.http.put(this.urlTrip + '/' + model.tripId, model)
                        .success(function (data) {
                        callBackSave(model);
                    })
                        .error(function (error) {
                        _this.errorMessage = 'Unable to save Trip data: ' + error.Message;
                        alert(_this.errorMessage);
                    });
                }
            };
            DataService.prototype.deleteTrip = function (model, callBack) {
                var _this = this;
                if (callBack === void 0) { callBack = angular.noop; }
                if (!confirm('Are you sure you want to delete?')) {
                    return false;
                }
                this.http.delete(this.urlTrip + '/' + model.tripId)
                    .success(function (data) {
                    callBack(model);
                })
                    .error(function (error) {
                    _this.errorMessage = 'Unable to delete Trip data: ' + error.Message;
                    alert(_this.errorMessage);
                });
                return true;
            };
            ;
            return DataService;
        }());
        Services.DataService = DataService;
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
//# sourceMappingURL=DataServices.js.map
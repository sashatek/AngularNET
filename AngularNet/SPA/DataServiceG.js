var EntityType;
(function (EntityType) {
    EntityType[EntityType["Trip"] = 0] = "Trip";
    EntityType[EntityType["TransportationMode"] = 1] = "TransportationMode";
})(EntityType || (EntityType = {}));
var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var DataServiceG = (function () {
            function DataServiceG(http, $location) {
                this.http = http;
                this.$location = $location;
                this.ref = {};
                this.errorMessage = null;
                this.sTest = "Good message from Data Service";
                this.state = {};
                this.configs = [
                    { entityType: EntityType.Trip, url: "api/Trip", varName: "trip", pkField: "tripId" },
                ];
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
                this.trip = new TripWorker();
                this.state.viewMode = 0;
            }
            DataServiceG.prototype.getAllModels = function (etype, qry, callBack) {
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
            DataServiceG.prototype.getModel = function (etype, id, callBack) {
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
            DataServiceG.prototype.saveModel = function (etype, model, callBackAdd, callBackSave) {
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
            DataServiceG.prototype.deleteModel = function (etype, model, callBack) {
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
            return DataServiceG;
        }());
        Services.DataServiceG = DataServiceG;
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
//# sourceMappingURL=DataServiceG.js.map
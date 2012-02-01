pc.extend(pc.fw, function () {
        /*
        */
        
    /**
     * @name pc.fw.ModelComponentSystem
     * @constructor Create a new ModelComponentSystem
     * @class Allows an Entity to render a model
     * @param {Object} context
     * @extends pc.fw.ComponentSystem
     */
    var ModelComponentSystem = function ModelComponentSystem (context) {
        this.context = context;

        context.systems.add("model", this);
        
        this.bind("set_asset", this.onSetAsset.bind(this));
        this.bind("set", pc.callback(this, _onSet));
        this.bind('set_assets', this.onSetAssets.bind(this));
        this.bind('set_models', this.onSetModels.bind(this));
    }
    ModelComponentSystem = ModelComponentSystem.extendsFrom(pc.fw.ComponentSystem);

    ModelComponentSystem.prototype.createComponent = function (entity, data) {
        var componentData = new pc.fw.ModelComponentData();

        this.initialiseComponent(entity, componentData, data, ['assets']);

        return componentData;
    };

    ModelComponentSystem.prototype.deleteComponent = function (entity) {
        // Remove all models from scene/hierarchy
        this.set(entity, 'assets', []);
        
        /*
        this.set(entity, 'asset', null);
        var i, len = component.models.length;
        for (i = 0; i < len; i++) {
        this.context.scene.removeModel(component.model);
            entity.removeChild(component.model.getGraph());
        */
        this.removeComponent(entity);
    };

    ModelComponentSystem.prototype.getModel = function (entity) {
        return this.getComponentData(entity).model;
    };

    ModelComponentSystem.prototype.setVisible = function (entity, visible) {
        var model = this.getModel(entity);
        if (model) {
            var inScene = this.context.scene.containsModel(model);
            
            if (visible && !inScene) {
                this.context.scene.addModel(model);
            } else if (!visible && inScene) {
                this.context.scene.removeModel(model);
            }
        }
    };

    ModelComponentSystem.prototype.loadModelAssets = function(entity, guids) {
        if (!guids || guids.length === 0) {
            return;
        }

    	var assetRequests = guids.map(function (guid) {
            return new pc.resources.AssetRequest(guid);
        });
        var options = {
            batch: entity.getRequestBatch()
        };
		
    	this.context.loader.request(assetRequests, function (assetResources) {
    	    var assets = [];
            var fileRequests = guids.map(function (guid) {
                var asset = assetResources[guid];
                assets.push(asset);
                
                return new pc.resources.ModelRequest(asset.getFileUrl());
            });
            var assetNames = guids.map(function (guid) {
                return assetResources[guid].name;
            });
            
            this.context.loader.request(fileRequests, function (modelResources) {
                var models = {};
                var i, len = fileRequests.length;
                var j;
                for (i = 0; i < len; i++) {
                    models[assetNames[i]] = modelResources[fileRequests[i].identifier];
                    
                    // Generate wireframe geometries if we're in the Designer Tool
                    if (this.context.designer) {
                        var geometries = models[assetNames[i]].getGeometries();
                        for (j = 0; j < geometries.length; j++) {
                            geometries[j].generateWireframe();
                        }
                    }
                }
                this.set(entity, 'models', models);
                this.set(entity, 'assetList', assets);
            }.bind(this), function (errors, resources) {
                Object.keys(errors).forEach(function (key) {
                    logERROR(errors[key]);
                });
            }, function (progress) {
            }, options);
    	}.bind(this), function (errors, resources) {
    	    Object.keys(errors).forEach(function (key) {
    	        logERROR(errors[key]);
    	    });
    	}, function (progress) {
    		
    	}, options);
	};
    
    /**
     * @name pc.fw.ModelComponentSystem#getModel()
     * @description Get a model instance from the entity, referenced either by index into the model list or name of the asset
     * @param {Number|String} index If a number it's the index into the model list, if a string it's the name of the asset the model was created from
     * @returns {pc.scene.Model} 
     */
    ModelComponentSystem.prototype.getModel = function (entity) {
        if(newValue) {
        return this._getComponentData(entity).model;
        
        if (pc.type(index) == 'number') {
            var asset = componentData.assetList[index];
            return componentData.models[asset.name]
        } else {
        }
    }; 
    
            this.set(entity, 'models', {});
        }
    };

    ModelComponentSystem.prototype.onSetModels = function (entity, name, oldValue, newValue) {
        var componentData = this.getComponentData(entity);
        var model;
        
        // remove all previous models from the scene and hierarchy
        for (modelName in oldValue) {
            if (oldValue.hasOwnProperty(modelName)) {
                model = oldValue[modelName];

                this.context.scene.removeModel(model);
                entity.removeChild(model.getGraph());
            }
        }

        if(newValue) {
            for (modelName in newValue) {
                if (newValue.hasOwnProperty(modelName)) {
                    model = newValue[modelName];
                    
                    // Store the entity that owns this model
        }
    };
    return {
        ModelComponentSystem: ModelComponentSystem
    }
}());


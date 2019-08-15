define(["require", "exports", "./MapEntry"], function (require, exports, MapEntry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResourceMap = /** @class */ (function () {
        function ResourceMap() {
            this._resourceMap = [];
            this._numOutstandingLoads = 0;
        }
        Object.defineProperty(ResourceMap, "Instance", {
            get: function () {
                if (this._instance === null) {
                    this._instance = new ResourceMap();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        ResourceMap.prototype.IsAssetLoaded = function (rName) {
            return (rName in this._resourceMap);
        };
        ResourceMap.prototype.AsyncLoadRequested = function (rName) {
            this._resourceMap[rName] = new MapEntry_1.default();
            ++this._numOutstandingLoads;
        };
        ResourceMap.prototype.IncAssetRefCount = function (rName) {
            this._resourceMap[rName].RefCount++;
        };
        ResourceMap._instance = null;
        return ResourceMap;
    }());
    exports.default = ResourceMap;
});
//# sourceMappingURL=ResourceMap.js.map
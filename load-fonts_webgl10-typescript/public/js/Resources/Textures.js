define(["require", "exports", "./ResourceMap"], function (require, exports, ResourceMap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Textures = /** @class */ (function () {
        function Textures() {
        }
        Object.defineProperty(Textures, "Instance", {
            get: function () {
                if (this._instance === null) {
                    this._instance = new Textures();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Textures.prototype.LoadTexture = function (textureName) {
            var _this = this;
            if (!ResourceMap_1.default.Instance.IsAssetLoaded(textureName)) {
                ResourceMap_1.default.Instance.AsyncLoadRequested(textureName);
                var img_1 = new Image();
                img_1.onload = function () {
                    _this.ProcessLoadedImage(textureName, img_1);
                };
                img_1.src = textureName;
            }
            else {
                ResourceMap_1.default.Instance.IncAssetRefCount(textureName);
            }
        };
        Textures.prototype.ProcessLoadedImage = function (textureName, image) {
            console.log("ProcessLoadedImage");
        };
        Textures._instance = null;
        return Textures;
    }());
    exports.default = Textures;
});
//# sourceMappingURL=Textures.js.map
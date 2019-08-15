define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Fonts = /** @class */ (function () {
        function Fonts() {
        }
        Object.defineProperty(Fonts, "Instance", {
            get: function () {
                if (this._instance === null) {
                    this._instance = new Fonts();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Fonts.prototype.LoadFont = function (fontName) {
        };
        Fonts.prototype.StoreLoadedFont = function () {
        };
        Fonts._instance = null;
        return Fonts;
    }());
    exports.default = Fonts;
});
//# sourceMappingURL=Fonts.js.map
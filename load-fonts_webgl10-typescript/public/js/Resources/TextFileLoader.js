define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FileType;
    (function (FileType) {
        FileType[FileType["XmlFile"] = 0] = "XmlFile";
        FileType[FileType["TextFile"] = 1] = "TextFile";
    })(FileType = exports.FileType || (exports.FileType = {}));
    var TextFileLoader = /** @class */ (function () {
        function TextFileLoader() {
        }
        Object.defineProperty(TextFileLoader, "Instance", {
            get: function () {
                if (this._instance === null) {
                    this._instance = new TextFileLoader();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        TextFileLoader.prototype.LoadTextFile = function (fileName, fileType, callbackFunction) {
        };
        TextFileLoader._instance = null;
        return TextFileLoader;
    }());
    exports.default = TextFileLoader;
});
//# sourceMappingURL=TextFileLoader.js.map
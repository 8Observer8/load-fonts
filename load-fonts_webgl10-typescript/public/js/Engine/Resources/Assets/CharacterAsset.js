"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Asset_1 = require("./Asset");
var CharacterAsset = /** @class */ (function (_super) {
    __extends(CharacterAsset, _super);
    function CharacterAsset(characterInfo, xmlAsset) {
        var _this = _super.call(this) || this;
        _this._fontImageName = null;
        _this._characterInfo = characterInfo;
        _this._xmlAsset = xmlAsset;
        return _this;
    }
    Object.defineProperty(CharacterAsset.prototype, "CharacterInfo", {
        get: function () {
            return this._characterInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterAsset.prototype, "XmlAsset", {
        get: function () {
            return this._xmlAsset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterAsset.prototype, "FontImageName", {
        get: function () {
            return this._fontImageName;
        },
        set: function (v) {
            this._fontImageName = v;
        },
        enumerable: true,
        configurable: true
    });
    return CharacterAsset;
}(Asset_1.default));
exports.default = CharacterAsset;

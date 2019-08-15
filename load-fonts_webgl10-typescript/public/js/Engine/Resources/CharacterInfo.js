"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterInfo = /** @class */ (function () {
    function CharacterInfo() {
        this._texCoordLeft = 0;
        this._texCoordRight = 0;
        this._texCoordBottom = 0;
        this._texCoordTop = 0;
        this._charWidth = 0;
        this._CharHeight = 0;
        this._charWidthOffset = 0;
        this._charHeightOffset = 0;
        this._charAspectRatio = 0;
    }
    Object.defineProperty(CharacterInfo.prototype, "TexCoordLeft", {
        get: function () {
            return this._texCoordLeft;
        },
        set: function (v) {
            this._texCoordLeft = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "TexCoordRight", {
        get: function () {
            return this._texCoordRight;
        },
        set: function (v) {
            this._texCoordRight = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "TexCoordBottom", {
        get: function () {
            return this._texCoordBottom;
        },
        set: function (v) {
            this._texCoordBottom = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "TexCoordTop", {
        get: function () {
            return this._texCoordTop;
        },
        set: function (v) {
            this._texCoordTop = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "CharWidth", {
        get: function () {
            return this._charWidth;
        },
        set: function (v) {
            this._charWidth = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "CharHeight", {
        get: function () {
            return this._CharHeight;
        },
        set: function (v) {
            this._CharHeight = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "CharWidthOffset", {
        get: function () {
            return this._charWidthOffset;
        },
        set: function (v) {
            this._charWidthOffset = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "CharHeightOffset", {
        get: function () {
            return this._charHeightOffset;
        },
        set: function (v) {
            this._charHeightOffset = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "CharAspectRatio", {
        get: function () {
            return this._charAspectRatio;
        },
        set: function (v) {
            this._charAspectRatio = v;
        },
        enumerable: true,
        configurable: true
    });
    return CharacterInfo;
}());
exports.default = CharacterInfo;

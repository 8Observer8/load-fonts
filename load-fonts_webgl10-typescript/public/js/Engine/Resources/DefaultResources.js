"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceMap_1 = require("./ResourceMap");
var TextFileLoader_1 = require("./TextFileLoader");
var ColorShaderProgram_1 = require("../ShaderPrograms/ColorShaderProgram");
var TextureShaderProgram_1 = require("../ShaderPrograms/TextureShaderProgram");
var SpriteShaderProgram_1 = require("../ShaderPrograms/SpriteShaderProgram");
var Fonts_1 = require("./Fonts");
var DefaultResources = /** @class */ (function () {
    function DefaultResources() {
        this._defaultFontName = "assets/fonts/system-default-font";
        this._vColorShaderName = "assets/shaders/vColor.glsl";
        this._fColorShaderName = "assets/shaders/fColor.glsl";
        this._vTextureShaderName = "assets/shaders/vTexture.glsl";
        this._fTextureShaderName = "assets/shaders/fTexture.glsl";
    }
    Object.defineProperty(DefaultResources, "Instance", {
        get: function () {
            if (this._instance === null) {
                this._instance = new DefaultResources();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    DefaultResources.prototype.Initialize = function (callbackFunction) {
        var _this = this;
        TextFileLoader_1.default.Instance.LoadTextFile(this._vColorShaderName, TextFileLoader_1.FileType.TextFile, null);
        TextFileLoader_1.default.Instance.LoadTextFile(this._fColorShaderName, TextFileLoader_1.FileType.TextFile, null);
        TextFileLoader_1.default.Instance.LoadTextFile(this._vTextureShaderName, TextFileLoader_1.FileType.TextFile, null);
        TextFileLoader_1.default.Instance.LoadTextFile(this._fTextureShaderName, TextFileLoader_1.FileType.TextFile, null);
        Fonts_1.default.Instance.LoadFont(this._defaultFontName);
        ResourceMap_1.default.Instance.SetLoadCompleteCallback(function () { _this.CreateShaderPrograms(callbackFunction); });
    };
    Object.defineProperty(DefaultResources.prototype, "ColorShaderProgram", {
        get: function () {
            return this._colorShaderProgram;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultResources.prototype, "TextureShaderProgram", {
        get: function () {
            return this._textureShaderProgram;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultResources.prototype, "SpriteShaderProgram", {
        get: function () {
            return this._spriteShaderProgram;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultResources.prototype, "DefaultFontName", {
        get: function () {
            return this._defaultFontName;
        },
        enumerable: true,
        configurable: true
    });
    DefaultResources.prototype.CreateShaderPrograms = function (callbackFunction) {
        ResourceMap_1.default.Instance.SetLoadCompleteCallback(null);
        this._colorShaderProgram = new ColorShaderProgram_1.default(this._vColorShaderName, this._fColorShaderName);
        this._textureShaderProgram = new TextureShaderProgram_1.default(this._vTextureShaderName, this._fTextureShaderName);
        this._spriteShaderProgram = new SpriteShaderProgram_1.default(this._vTextureShaderName, this._fTextureShaderName);
        callbackFunction();
    };
    DefaultResources._instance = null;
    return DefaultResources;
}());
exports.default = DefaultResources;

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
var Renderable_1 = require("./Renderable");
var gl_matrix_1 = require("gl-matrix");
var DefaultResources_1 = require("../Resources/DefaultResources");
var Textures_1 = require("../Resources/Textures");
var EngineCore_1 = require("../EngineCore");
var TextureRenderable = /** @class */ (function (_super) {
    __extends(TextureRenderable, _super);
    function TextureRenderable(textureName) {
        var _this = _super.call(this) || this;
        _this._textureName = textureName;
        _this._texShaderProgram = DefaultResources_1.default.Instance.TextureShaderProgram;
        _this.Color = gl_matrix_1.vec4.fromValues(1, 1, 1, 0);
        return _this;
    }
    TextureRenderable.prototype.Draw = function (vpMatrix) {
        var gl = EngineCore_1.default.Instance.gl;
        Textures_1.default.Instance.Active(this._textureName);
        this._texShaderProgram.Active(this.Color, vpMatrix);
        this._texShaderProgram.LoadObjectTransform(this.XForm.GetModelTransform());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    Object.defineProperty(TextureRenderable.prototype, "TextureName", {
        get: function () {
            return this._textureName;
        },
        set: function (v) {
            this._textureName = v;
        },
        enumerable: true,
        configurable: true
    });
    return TextureRenderable;
}(Renderable_1.default));
exports.default = TextureRenderable;

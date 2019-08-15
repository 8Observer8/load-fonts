"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultResources_1 = require("../Resources/DefaultResources");
var gl_matrix_1 = require("gl-matrix");
var EngineCore_1 = require("../EngineCore");
var Transform_1 = require("../Transform");
var Renderable = /** @class */ (function () {
    function Renderable() {
        this._shaderProgram = DefaultResources_1.default.Instance.ColorShaderProgram;
        this._xForm = new Transform_1.default();
        this._color = gl_matrix_1.vec4.fromValues(1, 1, 1, 1);
    }
    Object.defineProperty(Renderable.prototype, "XForm", {
        get: function () {
            return this._xForm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderable.prototype, "Color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            this._color = color;
        },
        enumerable: true,
        configurable: true
    });
    Renderable.prototype.Draw = function (vpMatrix) {
        var gl = EngineCore_1.default.Instance.gl;
        this._shaderProgram.Active(this._color, vpMatrix);
        this._shaderProgram.LoadObjectTransform(this._xForm.GetModelTransform());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    return Renderable;
}());
exports.default = Renderable;

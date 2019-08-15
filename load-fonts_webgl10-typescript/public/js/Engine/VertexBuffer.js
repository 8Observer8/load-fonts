"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EngineCore_1 = require("./EngineCore");
var VertexBuffer = /** @class */ (function () {
    function VertexBuffer() {
    }
    Object.defineProperty(VertexBuffer, "Instance", {
        get: function () {
            if (this._instance === null) {
                this._instance = new VertexBuffer;
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    VertexBuffer.prototype.Initialize = function () {
        var vertices = [
            0.5, 0.5, 0.0,
            -0.5, 0.5, 0.0,
            0.5, -0.5, 0.0,
            -0.5, -0.5, 0.0
        ];
        var textureCoords = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ];
        var gl = EngineCore_1.default.Instance.gl;
        this._squareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._squareVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this._textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    };
    Object.defineProperty(VertexBuffer.prototype, "SquareVertexBuffer", {
        get: function () {
            return this._squareVertexBuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexBuffer.prototype, "TextureCoordBuffer", {
        get: function () {
            return this._textureCoordBuffer;
        },
        enumerable: true,
        configurable: true
    });
    VertexBuffer._instance = null;
    return VertexBuffer;
}());
exports.default = VertexBuffer;

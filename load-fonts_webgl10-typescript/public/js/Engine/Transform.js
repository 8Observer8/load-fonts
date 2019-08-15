"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gl_matrix_1 = require("gl-matrix");
var Transform = /** @class */ (function () {
    function Transform() {
        this._position = gl_matrix_1.vec2.fromValues(0, 0);
        this._scale = gl_matrix_1.vec2.fromValues(1, 1);
        this._rotationInRad = 0.0;
    }
    Transform.prototype.SetPosition = function (xPos, yPos) {
        this.XPos = xPos;
        this.YPos = yPos;
    };
    Transform.prototype.GetPosition = function () {
        return this._position;
    };
    Object.defineProperty(Transform.prototype, "XPos", {
        get: function () {
            return this._position[0];
        },
        set: function (xPos) {
            this._position[0] = xPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "YPos", {
        get: function () {
            return this._position[1];
        },
        set: function (yPos) {
            this._position[1] = yPos;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.IncXPosBy = function (delta) {
        this._position[0] += delta;
    };
    Transform.prototype.IncYPosBy = function (delta) {
        this._position[1] += delta;
    };
    Transform.prototype.IncRotationByDegree = function (rotationInDegree) {
        this.RotationInRad += rotationInDegree * Math.PI / 180.0;
    };
    Transform.prototype.IncRotationByRad = function (deltaRad) {
        this.RotationInRad += this._rotationInRad + deltaRad;
    };
    Object.defineProperty(Transform.prototype, "RotationInRad", {
        get: function () {
            return this._rotationInRad;
        },
        set: function (value) {
            this._rotationInRad = value;
            while (this._rotationInRad > (2.0 * Math.PI)) {
                this._rotationInRad -= (2.0 * Math.PI);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "RotationInDegree", {
        get: function () {
            return this._rotationInRad * 180.0 / Math.PI;
        },
        set: function (value) {
            this.RotationInRad = value * Math.PI / 180.0;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.SetSize = function (width, height) {
        this.Width = width;
        this.Height = height;
    };
    Object.defineProperty(Transform.prototype, "Width", {
        get: function () {
            return this._scale[0];
        },
        set: function (value) {
            this._scale[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "Height", {
        get: function () {
            return this._scale[1];
        },
        set: function (value) {
            this._scale[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.GetModelTransform = function () {
        var matrix = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.translate(matrix, matrix, gl_matrix_1.vec3.fromValues(this.XPos, this.YPos, 0.0));
        gl_matrix_1.mat4.rotateZ(matrix, matrix, this.RotationInRad);
        gl_matrix_1.mat4.scale(matrix, matrix, gl_matrix_1.vec3.fromValues(this.Width, this.Height, 1.0));
        return matrix;
    };
    return Transform;
}());
exports.default = Transform;

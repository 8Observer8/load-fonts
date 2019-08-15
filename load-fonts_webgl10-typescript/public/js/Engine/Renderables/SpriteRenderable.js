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
var TextureRenderable_1 = require("./TextureRenderable");
var DefaultResources_1 = require("../Resources/DefaultResources");
var ResourceMap_1 = require("../Resources/ResourceMap");
var EngineCore_1 = require("../EngineCore");
var Textures_1 = require("../Resources/Textures");
//// the expected texture cooridnate array is an array of 8 floats where elements:
//  [0] [1]: is u/v coordinate of Top-Right 
//  [2] [3]: is u/v coordinate of Top-Left
//  [4] [5]: is u/v coordinate of Bottom-Right
//  [6] [7]: is u/v coordinate of Bottom-Left
// Convention: eName is an enumerated data type
var TexCoordArray;
(function (TexCoordArray) {
    TexCoordArray[TexCoordArray["Left"] = 2] = "Left";
    TexCoordArray[TexCoordArray["Right"] = 0] = "Right";
    TexCoordArray[TexCoordArray["Top"] = 1] = "Top";
    TexCoordArray[TexCoordArray["Bottom"] = 5] = "Bottom";
})(TexCoordArray = exports.TexCoordArray || (exports.TexCoordArray = {}));
var SpriteRenderable = /** @class */ (function (_super) {
    __extends(SpriteRenderable, _super);
    function SpriteRenderable(textureName) {
        var _this = _super.call(this, textureName) || this;
        _this._texLeft = 0.0;
        _this._texRight = 1.0;
        _this._texTop = 1.0;
        _this._texBottom = 0.0;
        _this._spriteShaderProgram = DefaultResources_1.default.Instance.SpriteShaderProgram;
        return _this;
    }
    // Specify element region by texture coordinate (between 0 to 1)
    SpriteRenderable.prototype.SetElementUVCoordinate = function (left, right, bottom, top) {
        this._texLeft = left;
        this._texRight = right;
        this._texBottom = bottom;
        this._texTop = top;
    };
    // Specify element region by pixel positions (between 0 to image resolutions)
    SpriteRenderable.prototype.SetElementPixelPositions = function (left, right, bottom, top) {
        var texInfo = ResourceMap_1.default.Instance.RetrieveAsset(this.TextureName).TextureInfo;
        var imageW = texInfo.Width;
        var imageH = texInfo.Height;
        this._texLeft = left / imageW;
        this._texRight = right / imageW;
        this._texBottom = bottom / imageH;
        this._texTop = top / imageH;
    };
    SpriteRenderable.prototype.GetElementUVCoordinateArray = function () {
        return [
            this._texRight, this._texTop,
            this._texLeft, this._texTop,
            this._texRight, this._texBottom,
            this._texLeft, this._texBottom
        ];
    };
    SpriteRenderable.prototype.Draw = function (vpMatrix) {
        var gl = EngineCore_1.default.Instance.gl;
        this._spriteShaderProgram.SetTextureCoordinate(this.GetElementUVCoordinateArray());
        Textures_1.default.Instance.Active(this.TextureName);
        this._spriteShaderProgram.Active(this.Color, vpMatrix);
        this._spriteShaderProgram.LoadObjectTransform(this.XForm.GetModelTransform());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    return SpriteRenderable;
}(TextureRenderable_1.default));
exports.default = SpriteRenderable;

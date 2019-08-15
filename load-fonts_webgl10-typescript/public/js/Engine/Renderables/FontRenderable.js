"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpriteRenderable_1 = require("./SpriteRenderable");
var DefaultResources_1 = require("../Resources/DefaultResources");
var Transform_1 = require("../Transform");
var Fonts_1 = require("../Resources/Fonts");
var FontRenderable = /** @class */ (function () {
    function FontRenderable(text) {
        this._fontName = DefaultResources_1.default.Instance.DefaultFontName;
        this._oneChar = new SpriteRenderable_1.default(this._fontName + ".png");
        this._xForm = new Transform_1.default();
        this._text = text;
    }
    Object.defineProperty(FontRenderable.prototype, "XForm", {
        get: function () {
            return this._xForm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontRenderable.prototype, "Text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            this._text = value;
            this.Height = this.XForm.Height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontRenderable.prototype, "FontName", {
        get: function () {
            return this._fontName;
        },
        set: function (value) {
            this._fontName = value;
            this._oneChar.TextureName = this._fontName + ".png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontRenderable.prototype, "Height", {
        set: function (h) {
            // This is for "A"
            var charInfo = Fonts_1.default.Instance.GetCharInfo(this._fontName, "A".charCodeAt(0));
            var w = h * charInfo.CharAspectRatio;
            this._xForm.SetSize(w * this._text.length, h);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontRenderable.prototype, "Color", {
        get: function () {
            return this._oneChar.Color;
        },
        set: function (color) {
            this._oneChar.Color = color;
        },
        enumerable: true,
        configurable: true
    });
    FontRenderable.prototype.Draw = function (vpMatrix) {
        // We will draw the text string by calling to mOneChar for each of the
        // chars in the _text string.
        var widthOfOneChar = this._xForm.Width / this._text.length;
        var heightOfOneChar = this._xForm.Height;
        // this.mOneChar.getXform().SetRotationInRad(this.mXform.getRotationInRad());
        var yPos = this._xForm.YPos;
        // Center position of the first char
        var xPos = this._xForm.XPos - (widthOfOneChar / 2) + (widthOfOneChar * 0.5);
        var charIndex, aChar, charInfo, xSize, ySize, xOffset, yOffset;
        for (charIndex = 0; charIndex < this._text.length; charIndex++) {
            aChar = this._text.charCodeAt(charIndex);
            charInfo = Fonts_1.default.Instance.GetCharInfo(this._fontName, aChar);
            // set the texture coordinate
            this._oneChar.SetElementUVCoordinate(charInfo.TexCoordLeft, charInfo.TexCoordRight, charInfo.TexCoordBottom, charInfo.TexCoordTop);
            // now the size of the char
            xSize = widthOfOneChar * charInfo.CharWidth;
            ySize = heightOfOneChar * charInfo.CharHeight;
            this._oneChar.XForm.SetSize(xSize, ySize);
            // how much to offset from the center
            xOffset = widthOfOneChar * charInfo.CharWidthOffset * 0.5;
            yOffset = heightOfOneChar * charInfo.CharHeightOffset * 0.5;
            this._oneChar.XForm.SetPosition(xPos - xOffset, yPos - yOffset);
            this._oneChar.Draw(vpMatrix);
            xPos += widthOfOneChar;
        }
    };
    return FontRenderable;
}());
exports.default = FontRenderable;

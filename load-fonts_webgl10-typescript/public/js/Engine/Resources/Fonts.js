"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceMap_1 = require("./ResourceMap");
var Textures_1 = require("./Textures");
var TextFileLoader_1 = require("./TextFileLoader");
var CharacterAsset_1 = require("./Assets/CharacterAsset");
var CharacterInfo_1 = require("./CharacterInfo");
var Fonts = /** @class */ (function () {
    function Fonts() {
    }
    Object.defineProperty(Fonts, "Instance", {
        get: function () {
            if (this._instance === null) {
                this._instance = new Fonts();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Fonts.prototype.LoadFont = function (fontName) {
        var _this = this;
        if (!ResourceMap_1.default.Instance.IsAssetLoaded(fontName)) {
            var fontInfoSourceString = fontName + ".fnt";
            var textureSourceString = fontName + ".png";
            ResourceMap_1.default.Instance.AsyncLoadRequested(fontName);
            Textures_1.default.Instance.LoadTexture(textureSourceString);
            TextFileLoader_1.default.Instance.LoadTextFile(fontInfoSourceString, TextFileLoader_1.FileType.XmlFile, function (fontInfoSourceString) { return _this.StoreLoadedFont(fontInfoSourceString); });
        }
        else {
            ResourceMap_1.default.Instance.IncAssetRefCount(fontName);
        }
    };
    Fonts.prototype.GetCharInfo = function (fontName, aChar) {
        var xmlContent = ResourceMap_1.default.Instance.RetrieveAsset(fontName).XmlAsset.XmlContent;
        var charPath = "font/chars/char[@id=" + aChar + "]";
        var charInfo = xmlContent.evaluate(charPath, xmlContent, null, XPathResult.ANY_TYPE, null);
        var charNode = charInfo.iterateNext();
        var fontImageName = ResourceMap_1.default.Instance.RetrieveAsset(fontName).FontImageName;
        var texInfo = Textures_1.default.Instance.GetTextureInfo(fontImageName).TextureInfo;
        var x = parseInt(xmlContent.evaluate("@x", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        var y = parseInt(xmlContent.evaluate("@y", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        var width = parseInt(xmlContent.evaluate("@width", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        var height = parseInt(xmlContent.evaluate("@height", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        var leftPixel = x;
        var rightPixel = leftPixel + width - 1;
        var topPixel = (texInfo.Height - 1) - y;
        var bottomPixel = topPixel - height + 1;
        var returnInfo = new CharacterInfo_1.default();
        returnInfo.TexCoordLeft = leftPixel / (texInfo.Width - 1);
        returnInfo.TexCoordTop = topPixel / (texInfo.Height - 1);
        returnInfo.TexCoordRight = rightPixel / (texInfo.Width - 1);
        returnInfo.TexCoordBottom = bottomPixel / (texInfo.Height - 1);
        var commonPathResult = xmlContent.evaluate("font/common", xmlContent, null, XPathResult.ANY_TYPE, null);
        var commonNode = commonPathResult.iterateNext();
        var charHeight = parseInt(xmlContent.evaluate("@base", commonNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        var charWidth = parseInt(xmlContent.evaluate("@xadvance", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        var xOffset = parseInt(xmlContent.evaluate("@xoffset", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        var yOffset = parseInt(xmlContent.evaluate("@yoffset", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        returnInfo.CharWidth = width / charWidth;
        returnInfo.CharHeight = height / charHeight;
        returnInfo.CharWidthOffset = xOffset / charWidth;
        returnInfo.CharHeightOffset = yOffset / charHeight;
        returnInfo.CharAspectRatio = charWidth / charHeight;
        return returnInfo;
    };
    Fonts.prototype.StoreLoadedFont = function (fontInfoSourceString) {
        var fontName = fontInfoSourceString.slice(0, -4); // trims the .fnt extension
        var xmlAsset = ResourceMap_1.default.Instance.RetrieveAsset(fontInfoSourceString);
        var characterInfo = new CharacterInfo_1.default();
        var characterAsset = new CharacterAsset_1.default(characterInfo, xmlAsset);
        characterAsset.FontImageName = fontName + ".png";
        ResourceMap_1.default.Instance.AsyncLoadComleted(fontName, characterAsset);
    };
    Fonts._instance = null;
    return Fonts;
}());
exports.default = Fonts;

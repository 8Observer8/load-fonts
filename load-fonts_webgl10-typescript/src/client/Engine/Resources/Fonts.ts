import ResourceMap from "./ResourceMap";
import Textures from "./Textures";
import TextFileLoader, { FileType } from "./TextFileLoader";
import CharacterAsset from "./Assets/CharacterAsset";
import CharacterInfo from "./CharacterInfo";
import XmlAsset from "./Assets/XmlAsset";
import EngineCore from "../EngineCore";

export default class Fonts
{
    private static _instance: Fonts = null;
    private constructor() { }

    public static get Instance(): Fonts
    {
        if (this._instance === null)
        {
            this._instance = new Fonts();
        }
        return this._instance;
    }

    public LoadFont(fontName: string): void
    {
        if (!ResourceMap.Instance.IsAssetLoaded(fontName))
        {
            let fontInfoSourceString = fontName + ".fnt";
            let textureSourceString = fontName + ".png";

            ResourceMap.Instance.AsyncLoadRequested(fontName);

            Textures.Instance.LoadTexture(textureSourceString);
            TextFileLoader.Instance.LoadTextFile(
                fontInfoSourceString, FileType.XmlFile,
                (fontInfoSourceString) => this.StoreLoadedFont(fontInfoSourceString));
        }
        else
        {
            ResourceMap.Instance.IncAssetRefCount(fontName);
        }
    }

    public GetCharInfo(fontName: string, aChar: number): CharacterInfo
    {
        let xmlContent = (ResourceMap.Instance.RetrieveAsset(fontName) as CharacterAsset).XmlAsset.XmlContent;

        let charPath = "font/chars/char[@id=" + aChar + "]";
        let charInfo = xmlContent.evaluate(charPath, xmlContent, null, XPathResult.ANY_TYPE, null);
        let charNode = charInfo.iterateNext();

        let fontImageName = (ResourceMap.Instance.RetrieveAsset(fontName) as CharacterAsset).FontImageName;
        let texInfo = Textures.Instance.GetTextureInfo(fontImageName).TextureInfo;
        let x = parseInt(xmlContent.evaluate("@x", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        let y = parseInt(xmlContent.evaluate("@y", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        let width = parseInt(xmlContent.evaluate("@width", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        let height = parseInt(xmlContent.evaluate("@height", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);

        let leftPixel = x;
        let rightPixel = leftPixel + width - 1;
        let topPixel = (texInfo.Height - 1) - y;
        let bottomPixel = topPixel - height + 1;

        let returnInfo = new CharacterInfo();
        returnInfo.TexCoordLeft = leftPixel / (texInfo.Width - 1);
        returnInfo.TexCoordTop = topPixel / (texInfo.Height - 1);
        returnInfo.TexCoordRight = rightPixel / (texInfo.Width - 1);
        returnInfo.TexCoordBottom = bottomPixel / (texInfo.Height - 1);

        let commonPathResult = xmlContent.evaluate("font/common", xmlContent, null, XPathResult.ANY_TYPE, null);
        let commonNode = commonPathResult.iterateNext();
        let charHeight = parseInt(xmlContent.evaluate("@base", commonNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        let charWidth = parseInt(xmlContent.evaluate("@xadvance", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        let xOffset = parseInt(xmlContent.evaluate("@xoffset", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        let yOffset = parseInt(xmlContent.evaluate("@yoffset", charNode, null, XPathResult.ANY_TYPE, null).iterateNext().nodeValue);
        returnInfo.CharWidth = width / charWidth;
        returnInfo.CharHeight = height / charHeight;
        returnInfo.CharWidthOffset = xOffset / charWidth;
        returnInfo.CharHeightOffset = yOffset / charHeight;
        returnInfo.CharAspectRatio = charWidth / charHeight;

        return returnInfo;
    }

    private StoreLoadedFont(fontInfoSourceString: string): void
    {
        let fontName = fontInfoSourceString.slice(0, -4); // trims the .fnt extension
        let xmlAsset = ResourceMap.Instance.RetrieveAsset(fontInfoSourceString) as XmlAsset;
        let characterInfo = new CharacterInfo();
        let characterAsset = new CharacterAsset(characterInfo, xmlAsset);
        characterAsset.FontImageName = fontName + ".png";
        ResourceMap.Instance.AsyncLoadComleted(fontName, characterAsset);
    }
}
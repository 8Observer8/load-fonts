import Asset from "./Asset";
import CharacterInfo from "../CharacterInfo";
import XmlAsset from "./XmlAsset";

export default class CharacterAsset extends Asset
{
    private _characterInfo: CharacterInfo;
    private _xmlAsset: XmlAsset;
    private _fontImageName: string = null;

    public constructor(characterInfo: CharacterInfo, xmlAsset: XmlAsset)
    {
        super();
        this._characterInfo = characterInfo;
        this._xmlAsset = xmlAsset;
    }

    public get CharacterInfo(): CharacterInfo
    {
        return this._characterInfo;
    }

    public get XmlAsset(): XmlAsset
    {
        return this._xmlAsset;
    }

    public get FontImageName(): string
    {
        return this._fontImageName;
    }
    public set FontImageName(v: string)
    {
        this._fontImageName = v;
    }
}
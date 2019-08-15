
export default class CharacterInfo
{
    private _texCoordLeft: number = 0;
    private _texCoordRight: number = 0;
    private _texCoordBottom: number = 0;
    private _texCoordTop: number = 0;
    private _charWidth: number = 0;
    private _CharHeight: number = 0;
    private _charWidthOffset: number = 0;
    private _charHeightOffset: number = 0;
    private _charAspectRatio: number = 0;

    public get TexCoordLeft(): number
    {
        return this._texCoordLeft;
    }
    public set TexCoordLeft(v: number)
    {
        this._texCoordLeft = v;
    }
    public get TexCoordRight(): number
    {
        return this._texCoordRight;
    }
    public set TexCoordRight(v: number)
    {
        this._texCoordRight = v;
    }

    public get TexCoordBottom(): number
    {
        return this._texCoordBottom;
    }
    public set TexCoordBottom(v: number)
    {
        this._texCoordBottom = v;
    }

    public get TexCoordTop(): number
    {
        return this._texCoordTop;
    }
    public set TexCoordTop(v: number)
    {
        this._texCoordTop = v;
    }

    public get CharWidth(): number
    {
        return this._charWidth;
    }
    public set CharWidth(v: number)
    {
        this._charWidth = v;
    }

    public get CharHeight(): number
    {
        return this._CharHeight;
    }
    public set CharHeight(v: number)
    {
        this._CharHeight = v;
    }

    public get CharWidthOffset(): number
    {
        return this._charWidthOffset;
    }
    public set CharWidthOffset(v: number)
    {
        this._charWidthOffset = v;
    }

    public get CharHeightOffset(): number
    {
        return this._charHeightOffset;
    }
    public set CharHeightOffset(v: number)
    {
        this._charHeightOffset = v;
    }

    public get CharAspectRatio(): number
    {
        return this._charAspectRatio;
    }
    public set CharAspectRatio(v: number)
    {
        this._charAspectRatio = v;
    }
}
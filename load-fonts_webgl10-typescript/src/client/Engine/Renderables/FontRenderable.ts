import SpriteRenderable from "./SpriteRenderable";
import DefaultResources from "../Resources/DefaultResources";
import Transform from "../Transform";
import Fonts from "../Resources/Fonts";
import { mat4, vec4 } from "gl-matrix";
import CharacterInfo from "../Resources/CharacterInfo";

export default class FontRenderable
{
    private _fontName: string;
    private _oneChar: SpriteRenderable;
    private _xForm: Transform;
    private _text: string;

    public constructor(text: string)
    {
        this._fontName = DefaultResources.Instance.DefaultFontName;
        this._oneChar = new SpriteRenderable(this._fontName + ".png");
        this._xForm = new Transform();
        this._text = text;
    }

    public get XForm(): Transform
    {
        return this._xForm;
    }

    public get Text(): string
    {
        return this._text;
    }

    public set Text(value: string)
    {
        this._text = value;
        this.Height = this.XForm.Height;
    }

    public get FontName(): string
    {
        return this._fontName;
    }

    public set FontName(value: string)
    {
        this._fontName = value;
        this._oneChar.TextureName = this._fontName + ".png";
    }

    public set Height(h: number)
    {
        // This is for "A"
        let charInfo = Fonts.Instance.GetCharInfo(this._fontName, "A".charCodeAt(0));
        let w = h * charInfo.CharAspectRatio;
        this._xForm.SetSize(w * this._text.length, h);
    }

    public get Color(): vec4
    {
        return this._oneChar.Color;
    }

    public set Color(color: vec4)
    {
        this._oneChar.Color = color;
    }

    public Draw(vpMatrix: mat4): void
    {
        // We will draw the text string by calling to mOneChar for each of the
        // chars in the _text string.
        let widthOfOneChar = this._xForm.Width / this._text.length;
        let heightOfOneChar = this._xForm.Height;
        // this.mOneChar.getXform().SetRotationInRad(this.mXform.getRotationInRad());
        let yPos = this._xForm.YPos;

        // Center position of the first char
        let xPos = this._xForm.XPos - (widthOfOneChar / 2) + (widthOfOneChar * 0.5);
        let charIndex: number, aChar: number, charInfo: CharacterInfo,
            xSize: number, ySize: number, xOffset: number, yOffset: number;
        for (charIndex = 0; charIndex < this._text.length; charIndex++)
        {
            aChar = this._text.charCodeAt(charIndex);
            charInfo = Fonts.Instance.GetCharInfo(this._fontName, aChar);

            // set the texture coordinate
            this._oneChar.SetElementUVCoordinate(charInfo.TexCoordLeft, charInfo.TexCoordRight,
                charInfo.TexCoordBottom, charInfo.TexCoordTop);

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
    }
}
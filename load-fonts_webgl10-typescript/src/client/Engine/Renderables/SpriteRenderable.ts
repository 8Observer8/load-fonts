import TextureRenderable from "./TextureRenderable";
import DefaultResources from "../Resources/DefaultResources";
import ResourceMap from "../Resources/ResourceMap";
import TextureAsset from "../Resources/Assets/TextureAsset";
import { mat4 } from "gl-matrix";
import SpriteShaderProgram from "../ShaderPrograms/SpriteShaderProgram";
import EngineCore from "../EngineCore";
import Textures from "../Resources/Textures";

//// the expected texture cooridnate array is an array of 8 floats where elements:
//  [0] [1]: is u/v coordinate of Top-Right 
//  [2] [3]: is u/v coordinate of Top-Left
//  [4] [5]: is u/v coordinate of Bottom-Right
//  [6] [7]: is u/v coordinate of Bottom-Left
// Convention: eName is an enumerated data type
export enum TexCoordArray
{
    Left = 2,
    Right = 0,
    Top = 1,
    Bottom = 5
}

export default class SpriteRenderable extends TextureRenderable
{
    private _texLeft = 0.0;
    private _texRight = 1.0;
    private _texTop = 1.0;
    private _texBottom = 0.0;
    private _spriteShaderProgram: SpriteShaderProgram;

    public constructor(textureName: string)
    {
        super(textureName);
        this._spriteShaderProgram = DefaultResources.Instance.SpriteShaderProgram;
    }

    // Specify element region by texture coordinate (between 0 to 1)
    public SetElementUVCoordinate(
        left: number, right: number, bottom: number, top: number): void
    {
        this._texLeft = left;
        this._texRight = right;
        this._texBottom = bottom;
        this._texTop = top;
    }

    // Specify element region by pixel positions (between 0 to image resolutions)
    public SetElementPixelPositions(
        left: number, right: number, bottom: number, top: number): void
    {
        let texInfo = (ResourceMap.Instance.RetrieveAsset(this.TextureName) as TextureAsset).TextureInfo;
        let imageW = texInfo.Width;
        let imageH = texInfo.Height;

        this._texLeft = left / imageW;
        this._texRight = right / imageW;
        this._texBottom = bottom / imageH;
        this._texTop = top / imageH;
    }

    public GetElementUVCoordinateArray(): number[]
    {
        return [
            this._texRight, this._texTop,          // x,y of top-right
            this._texLeft, this._texTop,
            this._texRight, this._texBottom,
            this._texLeft, this._texBottom
        ];
    }

    public Draw(vpMatrix: mat4): void
    {
        let gl = EngineCore.Instance.gl;
        this._spriteShaderProgram.SetTextureCoordinate(this.GetElementUVCoordinateArray());
        Textures.Instance.Active(this.TextureName);
        this._spriteShaderProgram.Active(this.Color, vpMatrix);
        this._spriteShaderProgram.LoadObjectTransform(this.XForm.GetModelTransform());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
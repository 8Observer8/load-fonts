import Renderable from "./Renderable";
import { vec4, mat4 } from "gl-matrix";
import DefaultResources from "../Resources/DefaultResources";
import Textures from "../Resources/Textures";
import TextureShaderProgram from "../ShaderPrograms/TextureShaderProgram";
import EngineCore from "../EngineCore";

export default class TextureRenderable extends Renderable
{
    private _textureName: string;
    private _texShaderProgram: TextureShaderProgram;

    public constructor(textureName: string)
    {
        super();
        this._textureName = textureName;
        this._texShaderProgram = DefaultResources.Instance.TextureShaderProgram;
        this.Color = vec4.fromValues(1, 1, 1, 0);
    }

    public Draw(vpMatrix: mat4): void
    {
        let gl = EngineCore.Instance.gl;
        Textures.Instance.Active(this._textureName);
        this._texShaderProgram.Active(this.Color, vpMatrix);
        this._texShaderProgram.LoadObjectTransform(this.XForm.GetModelTransform());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    public get TextureName(): string
    {
        return this._textureName;
    }

    public set TextureName(v: string)
    {
        this._textureName = v;
    }
}
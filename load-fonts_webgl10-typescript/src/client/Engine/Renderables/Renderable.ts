import DefaultResources from "../Resources/DefaultResources";
import { vec4, mat4 } from "gl-matrix";
import EngineCore from "../EngineCore";
import ColorShaderProgram from "../ShaderPrograms/ColorShaderProgram";
import Transform from "../Transform";

export default class Renderable
{
    private _shaderProgram: ColorShaderProgram;
    private _xForm: Transform;
    private _color: vec4;

    public constructor()
    {
        this._shaderProgram = DefaultResources.Instance.ColorShaderProgram;
        this._xForm = new Transform();
        this._color = vec4.fromValues(1, 1, 1, 1);
    }

    public get XForm(): Transform
    {
        return this._xForm;
    }

    public set Color(color: vec4)
    {
        this._color = color;
    }

    public get Color(): vec4
    {
        return this._color;
    }

    public Draw(vpMatrix: mat4): void
    {
        let gl = EngineCore.Instance.gl;
        this._shaderProgram.Active(this._color, vpMatrix);
        this._shaderProgram.LoadObjectTransform(this._xForm.GetModelTransform());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}

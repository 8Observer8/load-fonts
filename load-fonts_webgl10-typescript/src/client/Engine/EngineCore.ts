import VertexBuffer from "./VertexBuffer";
import Scene from "../Scene";
import DefaultResources from "./Resources/DefaultResources";
import { vec4 } from "gl-matrix";

export default class EngineCore
{
    private static _instance: EngineCore = null;
    private constructor() { }

    public static get Instance(): EngineCore
    {
        if (this._instance === null)
        {
            this._instance = new EngineCore;
        }
        return this._instance;
    }

    public Initialize(canvasName: string, scene: Scene): void
    {
        this.InitializeGL(canvasName);
        VertexBuffer.Instance.Initialize();
        DefaultResources.Instance.Initialize(() => { this.StartScene(scene); });
    }

    public ClearCanvas(color: vec4)
    {
        let gl = EngineCore.Instance.gl;
        gl.clearColor(color[0], color[1], color[2], color[3]);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    private InitializeGL(canvasName: string): void
    {
        let canvas = document.getElementById(canvasName) as HTMLCanvasElement;
        if (canvas === null)
        {
            console.log("Failed to get an element with the name: " + canvasName);
            return;
        }

        this._gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (this._gl === null)
        {
            console.log("Your browser does not support the HTML5 canvas element");
            return;
        }

        let gl = this._gl;

        gl.enable(gl.DEPTH_TEST);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    }

    private StartScene(scene: Scene): void
    {
        scene.Load();
    }

    private _gl: WebGLRenderingContext;
    public get gl(): WebGLRenderingContext
    {
        return this._gl;
    }
}
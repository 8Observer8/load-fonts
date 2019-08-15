import Textures from "./Engine/Resources/Textures";
import EngineCore from "./Engine/EngineCore";
import Camera from "./Engine/Camera";
import { vec3, vec4 } from "gl-matrix";
import FontRenderable from "./Engine/Renderables/FontRenderable";

export default class Screen
{
    public Load(): void
    {
        let textureName = "assets/fonts/system-default-font.png";
        Textures.Instance.LoadTexture(textureName);

        EngineCore.Instance.ClearCanvas(vec4.fromValues(0.282, 0.498, 0.282, 1.0));

        let gl = EngineCore.Instance.gl;

        let camera = new Camera(
            vec3.fromValues(0, 0, 0),
            10,
            vec4.fromValues(20, 20, gl.canvas.width - 40, gl.canvas.height - 40));
        camera.BackgroundColor = vec4.fromValues(0.905, 0.850, 0.752, 1);
        camera.SetupViewProjection();

        let textSystemFont = new FontRenderable("Hello, World!");
        this.InitText(textSystemFont, -3, 0, vec4.fromValues(0.282, 0.443, 0.498, 1), 1);
        textSystemFont.Draw(camera.VPMatrix);

        // let square = new Renderable();
        // square.Draw(camera.VPMatrix);
    }

    private InitText(font: FontRenderable, posX: number, posY: number, color: vec4, textHeight)
    {
        font.Color = color;
        font.XForm.SetPosition(posX, posY);
        font.Height = textHeight;
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Textures_1 = require("./Engine/Resources/Textures");
var EngineCore_1 = require("./Engine/EngineCore");
var Camera_1 = require("./Engine/Camera");
var gl_matrix_1 = require("gl-matrix");
var FontRenderable_1 = require("./Engine/Renderables/FontRenderable");
var Screen = /** @class */ (function () {
    function Screen() {
    }
    Screen.prototype.Load = function () {
        var textureName = "assets/fonts/system-default-font.png";
        Textures_1.default.Instance.LoadTexture(textureName);
        EngineCore_1.default.Instance.ClearCanvas(gl_matrix_1.vec4.fromValues(0.282, 0.498, 0.282, 1.0));
        var gl = EngineCore_1.default.Instance.gl;
        var camera = new Camera_1.default(gl_matrix_1.vec3.fromValues(0, 0, 0), 10, gl_matrix_1.vec4.fromValues(20, 20, gl.canvas.width - 40, gl.canvas.height - 40));
        camera.BackgroundColor = gl_matrix_1.vec4.fromValues(0.905, 0.850, 0.752, 1);
        camera.SetupViewProjection();
        var textSystemFont = new FontRenderable_1.default("Hello, World!");
        this.InitText(textSystemFont, -3, 0, gl_matrix_1.vec4.fromValues(0.282, 0.443, 0.498, 1), 1);
        textSystemFont.Draw(camera.VPMatrix);
        // let square = new Renderable();
        // square.Draw(camera.VPMatrix);
    };
    Screen.prototype.InitText = function (font, posX, posY, color, textHeight) {
        font.Color = color;
        font.XForm.SetPosition(posX, posY);
        font.Height = textHeight;
    };
    return Screen;
}());
exports.default = Screen;

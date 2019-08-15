
using System;
using OpenTK;
using OpenTK.Graphics;
using OpenTK.Graphics.OpenGL;
using Engine;

namespace LoadFonts
{
    class MainWindow : GameWindow
    {
        Scene _scene;

        //private FontRenderable _textSysFont = new FontRenderable("System Font: in Red");
        //private FontRenderable _textCon16 = new FontRenderable("Consolas 16: in black");
        //private FontRenderable _textCon24 = new FontRenderable("Consolas 24: in black");

        //private TextureRenderable _tank;

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

            Width = 400;
            Height = 400;

            _scene = new Scene();
            EngineCore.Instance.Initialize(_scene);
        }

        protected override void OnRenderFrame(FrameEventArgs e)
        {
            base.OnRenderFrame(e);

            _scene.Draw();
        }
    }
}


using System;
using OpenTK;
using Engine;

namespace LoadFonts
{
    class MainWindow : GameWindow
    {
        Scene _scene;

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

            Title = "Font, OpenGL 3.1, C#";
            Width = 400;
            Height = 400;

            _scene = new Scene(Width, Height);
            EngineCore.Instance.Initialize(_scene);
        }

        protected override void OnRenderFrame(FrameEventArgs e)
        {
            base.OnRenderFrame(e);

            _scene.Draw();

            SwapBuffers();
        }
    }
}


using OpenTK.Graphics;
using OpenTK.Graphics.OpenGL;

namespace Engine
{
    class EngineCore
    {
        private static EngineCore _instance;

        private EngineCore() { }

        public static EngineCore Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new EngineCore();
                }
                return _instance;
            }
        }

        public void Initialize(Scene scene)
        {
            InitializeGL();
            VertexBuffer.Instance.Initialize();
            DefaultResources.Instance.Initialize(() => { StartScene(scene); });
        }

        public void ClearCanvas(Color4 color)
        {
            GL.ClearColor(color);
            GL.Clear(ClearBufferMask.ColorBufferBit | ClearBufferMask.DepthBufferBit);
        }

        private void InitializeGL()
        {
            GL.Enable(EnableCap.DepthTest);
            GL.BlendFunc(BlendingFactor.SrcAlpha, BlendingFactor.OneMinusSrcAlpha);
            GL.Enable(EnableCap.Blend);
        }

        private void StartScene(Scene scene)
        {
            scene.Load();
            ResourceMap.Instance.SetLoadCompleteCallback(() => { InitScene(scene); });
        }

        private void InitScene(Scene scene)
        {
            scene.Initialize();
        }
    }
}


using OpenTK;
using OpenTK.Graphics;
using OpenTK.Graphics.OpenGL;

namespace Engine
{
    class Renderable
    {
        private ColorShaderProgram _shaderProgram;

        public Color4 Color { get; set; }
        public Transform XForm { get; private set; }

        public Renderable()
        {
            _shaderProgram = DefaultResources.Instance.ColorShaderProgram;
            Color = Color4.White;
            XForm = new Transform();
        }

        public void Draw(Matrix4 vpMatrix)
        {
            _shaderProgram.Active(Color, vpMatrix);
            _shaderProgram.LoadObjectTransform(XForm.ModelMatrix);
            GL.DrawArrays(PrimitiveType.TriangleStrip, 0, 4);
        }
    }
}


using OpenTK;
using OpenTK.Graphics;
using OpenTK.Graphics.OpenGL;

namespace Engine
{
    class TextureRenderable : Renderable
    {
        private TextureShaderProgram _texShaderProgram;

        public TextureRenderable(string textureName) : base()
        {
            TextureName = textureName;
            _texShaderProgram = DefaultResources.Instance.TextureShaderProgram;
            Color = new Color4(1f, 1f, 1f, 0f);
        }

        public string TextureName { get; set; }

        public new void Draw(Matrix4 vpMatrix)
        {
            Textures.Instance.Active(TextureName);
            _texShaderProgram.Active(Color, vpMatrix);
            _texShaderProgram.LoadObjectTransform(XForm.ModelMatrix);
            GL.DrawArrays(PrimitiveType.TriangleStrip, 0, 4);
        }
    }
}

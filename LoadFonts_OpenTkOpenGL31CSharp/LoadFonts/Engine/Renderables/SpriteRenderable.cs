
using OpenTK;
using OpenTK.Graphics.OpenGL;

namespace Engine
{
    //// the expected texture cooridnate array is an array of 8 floats where elements:
    //  [0] [1]: is u/v coordinate of Top-Right 
    //  [2] [3]: is u/v coordinate of Top-Left
    //  [4] [5]: is u/v coordinate of Bottom-Right
    //  [6] [7]: is u/v coordinate of Bottom-Left
    // Convention: eName is an enumerated data type
    enum TexCoordArray
    {
        Left = 2,
        Right = 0,
        Top = 1,
        Bottom = 5
    }

    class SpriteRenderable : TextureRenderable
    {
        private float _texLeft = 0.0f;
        private float _texRight = 1.0f;
        private float _texTop = 1.0f;
        private float _texBottom = 0.0f;
        private SpriteShaderProgram _spriteShaderProgram;

        public SpriteRenderable(string textureName) : base(textureName)
        {
            _spriteShaderProgram = DefaultResources.Instance.SpriteShaderProgram;
        }

        public void SetElementUVCoordinate(float left, float right, float bottom, float top)
        {
            _texLeft = left;
            _texRight = right;
            _texBottom = bottom;
            _texTop = top;
        }

        public float[] GetElementUVCoordinateArray()
        {
            return new float[] {
                _texRight, _texTop,
                _texLeft, _texTop,
                _texRight, _texBottom,
                _texLeft, _texBottom
            };
        }

        public new void Draw(Matrix4 vpMatrix)
        {
            _spriteShaderProgram.SetTextureCoordinate(GetElementUVCoordinateArray());
            Textures.Instance.Active(TextureName);
            _spriteShaderProgram.Active(Color, vpMatrix);
            _spriteShaderProgram.LoadObjectTransform(XForm.ModelMatrix);
            GL.DrawArrays(PrimitiveType.TriangleStrip, 0, 4);
        }
    }
}

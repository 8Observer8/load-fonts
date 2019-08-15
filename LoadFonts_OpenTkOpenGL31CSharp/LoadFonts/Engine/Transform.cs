
using OpenTK;

namespace Engine
{
    public class Transform
    {
        private Vector2 _position;
        private Vector2 _scale;

        public Transform()
        {
            _position = new Vector2(0f, 0f);
            _scale = new Vector2(1f, 1f);
        }

        public void SetPosition(float x, float y)
        {
            _position.X = x;
            _position.Y = y;
        }

        public void SetSize(float width, float height)
        {
            _scale.X = width;
            _scale.Y = height;
        }

        public float XPos
        {
            get
            {
                return _position.X;
            }

            set
            {
                _position.X = value;
            }
        }

        public float YPos
        {
            get
            {
                return _position.Y;
            }

            set
            {
                _position.Y = value;
            }
        }

        public float Width
        {
            get
            {
                return _scale.X;
            }

            set
            {
                _scale.X = value;
            }
        }

        public float Height
        {
            get
            {
                return _scale.Y;
            }

            set
            {
                _scale.Y = value;
            }
        }

        public Matrix4 ModelMatrix
        {
            get
            {
                Matrix4 matrix =
                    Matrix4.CreateScale(_scale.X, _scale.Y, 1f) *
                    Matrix4.CreateTranslation(_position.X, _position.Y, 0f);
                return matrix;
            }
        }
    }
}

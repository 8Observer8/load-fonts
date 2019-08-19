
using OpenTK;
using OpenTK.Graphics;

namespace Engine
{
    class FontRenderable
    {
        private string _fontName;
        private SpriteRenderable _oneChar;
        private string _text;

        public FontRenderable(string text)
        {
            _fontName = DefaultResources.Instance.DefaultFontName;
            _oneChar = new SpriteRenderable(_fontName + ".png");
            XForm = new Transform();
            _text = text;
        }

        public Transform XForm { get; private set; }
        public string Text
        {
            get
            {
                return _text;
            }
            set
            {
                _text = value;
            }
        }

        public string FontName
        {
            get
            {
                return _fontName;
            }

            set
            {
                _fontName = value;
                _oneChar.TextureName = _fontName + ".png";
            }
        }

        public float Height
        {
            set
            {
                float h = value;
                // This is for "A"
                CharacterInfo charInfo = Fonts.Instance.GetCharInfo(_fontName, "A"[0]);
                float w = h * charInfo.CharAspectRatio;
                XForm.SetSize(w * _text.Length, h);
            }
        }

        public Color4 Color
        {
            get
            {
                return _oneChar.Color;
            }
            set
            {
                _oneChar.Color = value;
            }
        }

        public void Draw(Matrix4 vpMatrix)
        {
            // We will draw the text string by calling to mOneChar for each of the
            // chars in the _text string.
            float widthOfOneChar = XForm.Width / _text.Length;
            float heightOfOneChar = XForm.Height;
            // this.mOneChar.getXform().SetRotationInRad(this.mXform.getRotationInRad());
            float yPos = XForm.YPos;

            // Center position of the first char
            float xPos = XForm.XPos - (widthOfOneChar / 2f) + (widthOfOneChar * 0.5f);

            int charIndex, aChar;
            CharacterInfo charInfo;
            float xSize, ySize, xOffset, yOffset;

            for (charIndex = 0; charIndex < _text.Length; charIndex++)
            {
                aChar = _text[charIndex];
                charInfo = Fonts.Instance.GetCharInfo(_fontName, aChar);

                // Set the texture coordinate
                _oneChar.SetElementUVCoordinate(charInfo.TexCoordLeft, charInfo.TexCoordRight,
                    charInfo.TexCoordBottom, charInfo.TexCoordTop);

                // Now the size of the char
                xSize = widthOfOneChar * charInfo.CharWidth;
                ySize = heightOfOneChar * charInfo.CharHeight;
                _oneChar.XForm.SetSize(xSize, ySize);

                // How much to offset from the center
                xOffset = widthOfOneChar * charInfo.CharWidthOffset * 0.5f;
                yOffset = heightOfOneChar * charInfo.CharHeightOffset * 0.5f;

                _oneChar.XForm.SetPosition(xPos - xOffset, yPos - yOffset);

                _oneChar.Draw(vpMatrix);

                xPos += widthOfOneChar;
            }
        }
    }
}

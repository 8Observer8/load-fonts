
using OpenTK.Graphics;
using System;

namespace Engine
{
    class DefaultResources
    {
        private static DefaultResources _instance;
        private readonly string _defaultFontName = "Assets/Fonts/system-default-font";
        private readonly string _vColorShaderName = "Assets/Shaders/vColor.glsl";
        private readonly string _fColorShaderName = "Assets/Shaders/fColor.glsl";
        private readonly string _vTextureShaderName = "Assets/Shaders/vTexture.glsl";
        private readonly string _fTextureShaderName = "Assets/Shaders/fTexture.glsl";

        private ColorShaderProgram _colorShaderProgram;
        private TextureShaderProgram _textureShaderProgram;
        private SpriteShaderProgram _spriteShaderProgram;

        private DefaultResources() { }

        public static DefaultResources Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new DefaultResources();
                }
                return _instance;
            }
        }

        public void Initialize(Action callback)
        {
            TextFileLoader.Instance.LoadTextFile(_vColorShaderName, FileType.TextFile, null);
            TextFileLoader.Instance.LoadTextFile(_fColorShaderName, FileType.TextFile, null);

            TextFileLoader.Instance.LoadTextFile(_vTextureShaderName, FileType.TextFile, null);
            TextFileLoader.Instance.LoadTextFile(_fTextureShaderName, FileType.TextFile, null);

            Fonts.Instance.LoadFont(_defaultFontName);
            
            ResourceMap.Instance.SetLoadCompleteCallback(() => { CreateShaderPrograms(callback); });
        }

        public ColorShaderProgram ColorShaderProgram
        {
            get
            {
                return _colorShaderProgram;
            }
        }

        public TextureShaderProgram TextureShaderProgram
        {
            get
            {
                return _textureShaderProgram;
            }
        }

        public SpriteShaderProgram SpriteShaderProgram
        {
            get
            {
                return _spriteShaderProgram;
            }
        }

        public string DefaultFontName
        {
            get
            {
                return _defaultFontName;
            }
        }

        public void CreateShaderPrograms(Action callback)
        {
            _colorShaderProgram = new ColorShaderProgram(_vColorShaderName, _fColorShaderName);
            _textureShaderProgram = new TextureShaderProgram(_vTextureShaderName, _fTextureShaderName);
            _spriteShaderProgram = new SpriteShaderProgram(_vTextureShaderName, _fTextureShaderName);
            callback();
        }
    }
}

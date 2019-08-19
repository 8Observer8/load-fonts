
using Engine;
using OpenTK;
using OpenTK.Graphics;

class Scene
{
    private Color4 _bgColor;
    private Camera _camera;
    private int _windowWidth;
    private int _windowHeight;
    private FontRenderable _textSystemFont;

    public bool IsReady { get; set; }

    public Scene(int windowWidth, int windowHeight)
    {
        _bgColor = new Color4(0.282f, 0.498f, 0.282f, 1f);
        _windowWidth = windowWidth;
        _windowHeight = windowHeight;

        IsReady = false;
    }

    public void Load()
    {
        if (!IsReady) return;
    }

    public void Initialize()
    {
        IsReady = true;

        _camera = new Camera(
            wcCenter: Vector2.Zero,
            wcWidth: 10,
            viewport: new Vector4(20, 20, _windowWidth - 40, _windowHeight - 40));

        _camera.BackgroundColor = new Color4(0.905f, 0.850f, 0.752f, 1f);

        _textSystemFont = new FontRenderable("Hello, World!");
        InitText(_textSystemFont, -3, 0, new Color4(0.282f, 0.443f, 0.498f, 1f), 1f);
    }

    public void Draw()
    {
        if (!IsReady) return;

        EngineCore.Instance.ClearCanvas(_bgColor);
        _camera.SetupViewProjection();
        _textSystemFont.Draw(_camera.VPMatrix);
    }

    private void InitText(FontRenderable font, float posX, float posY, Color4 color, float textHeight)
    {
        font.XForm.SetPosition(posX, posY);
        font.Color = color;
        font.Height = textHeight;
    }
}

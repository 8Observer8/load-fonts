
using Engine;
using OpenTK.Graphics;
using OpenTK.Graphics.OpenGL;

class Scene
{
    public bool IsReady { get; set; }

    public Scene()
    {
        
        IsReady = false;
    }

    public void Initialize()
    {
        int shader = GL.CreateShader(ShaderType.VertexShader);
        string err = GL.GetString(StringName.Vendor);
        var c = GraphicsContext.CurrentContext;
        IsReady = true;
    }

    public void Load()
    {
        if (!IsReady) return;
    }

    public void Draw()
    {
        if (!IsReady) return;
    }
}

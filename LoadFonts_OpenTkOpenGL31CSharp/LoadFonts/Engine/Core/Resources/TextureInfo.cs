
namespace Engine
{
    class TextureInfo
    {
        public string Name { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int Id { get; set; }

        public TextureInfo(string name, int width, int height, int id)
        {
            Name = name;
            Width = width;
            Height = height;
            Id = id;
        }
    }
}

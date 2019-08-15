
namespace Engine
{
    class TextureAsset : Asset
    {
        public TextureInfo TextureInfo { get; }

        public TextureAsset(TextureInfo textureInfo)
        {
            TextureInfo = textureInfo;
        }
    }
}

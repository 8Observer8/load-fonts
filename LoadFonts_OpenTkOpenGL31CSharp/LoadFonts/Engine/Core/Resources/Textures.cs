using OpenTK.Graphics.OpenGL;
using System.Drawing;
using System.IO;
using System.Drawing.Imaging;

namespace Engine
{
    class Textures
    {
        private static Textures _instance;

        private Textures()  {}

        public static Textures Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new Textures();
                }
                return _instance;
            }
        }

        public bool LoadTexture(string textureName)
        {
            if (!ResourceMap.Instance.IsAssetLoaded(textureName))
            {
                ResourceMap.Instance.AsyncLoadRequested(textureName);

                // Create the image object
                Bitmap image = null;
                try
                {
                    image = new Bitmap(textureName);
                    ProcessLoadedImage(textureName, image);
                }
                catch (FileNotFoundException e)
                {
                    Logger.Instance.Print("File \"Textures.cs\". Cannot find the texture: " + textureName);
                    return false;
                }
            }

            return true;
        }

        public void Active(string textureName)
        {
            TextureInfo texInfo = (ResourceMap.Instance.RetrieveAsset(textureName) as TextureAsset).TextureInfo;
            GL.BindTexture(TextureTarget.Texture2D, texInfo.Id);

            // To prevent texture wrappings
            GL.TexParameter(TextureTarget.Texture2D, TextureParameterName.TextureWrapS, (int)All.ClampToEdge);
            GL.TexParameter(TextureTarget.Texture2D, TextureParameterName.TextureWrapT, (int)All.ClampToEdge);

            // Handles how magnification and minimization filters will work
            GL.TexParameter(TextureTarget.Texture2D, TextureParameterName.TextureMagFilter, (int)All.Linear);
            GL.TexParameter(TextureTarget.Texture2D, TextureParameterName.TextureMinFilter, (int)All.LinearMipmapLinear);

            // Enable texture unit0
            GL.ActiveTexture(TextureUnit.Texture0);
        }

        public TextureAsset GetTextureInfo(string textureName)
        {
            return ResourceMap.Instance.RetrieveAsset(textureName) as TextureAsset;
        }

        private void ProcessLoadedImage(string textureName, Bitmap image)
        {
            int textureID = GL.GenTexture();
            GL.BindTexture(TextureTarget.Texture2D, textureID);

            BitmapData data = image.LockBits(new Rectangle(0, 0, image.Width, image.Height),
                ImageLockMode.ReadOnly, System.Drawing.Imaging.PixelFormat.Format32bppRgb);
            GL.TexImage2D(TextureTarget.Texture2D, 0, PixelInternalFormat.Rgba, image.Width, image.Height, 0, OpenTK.Graphics.OpenGL.PixelFormat.Bgra, PixelType.UnsignedByte, data.Scan0);
            image.UnlockBits(data);

            GL.GenerateMipmap(GenerateMipmapTarget.Texture2D);

            GL.BindTexture(TextureTarget.Texture2D, 0);

            TextureInfo texInfo = new TextureInfo(textureName, image.Width, image.Height, textureID);
            TextureAsset textureAsset = new TextureAsset(texInfo);
            ResourceMap.Instance.AsyncLoadComleted(textureName, textureAsset);
        }
    }
}

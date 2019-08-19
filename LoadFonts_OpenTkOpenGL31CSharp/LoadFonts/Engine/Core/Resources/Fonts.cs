
using System.Xml;

namespace Engine
{
    class Fonts
    {
        private static Fonts _instance;

        private Fonts() { }

        public static Fonts Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new Fonts();
                }
                return _instance;
            }
        }

        public void LoadFont(string fontName)
        {
            if (!ResourceMap.Instance.IsAssetLoaded(fontName))
            {
                string fontInfoSourceString = fontName + ".fnt";
                string textureSourceString = fontName + ".png";

                ResourceMap.Instance.AsyncLoadRequested(fontName);

                Textures.Instance.LoadTexture(textureSourceString);
                TextFileLoader.Instance.LoadTextFile(
                    fontInfoSourceString, FileType.XmlFile,
                    (name) => { StoreLoadedFont(name); });
            }
            else
            {
                ResourceMap.Instance.IncAssetRefCount(fontName);
            }
        }

        public CharacterInfo GetCharInfo(string fontName, int aChar)
        {
            XmlDocument xmlContent = (ResourceMap.Instance.RetrieveAsset(fontName) as CharacterAsset).XmlAsset.XmlContent;
            XmlElement xRoot = xmlContent.DocumentElement;

            string fontImageName = (ResourceMap.Instance.RetrieveAsset(fontName) as CharacterAsset).FontImageName;
            TextureInfo texInfo = Textures.Instance.GetTextureInfo(fontImageName).TextureInfo;

            string charPath = string.Format("/font/chars/char[@id=\"{0}\"]", aChar);
            XmlNode charNode = xRoot.SelectSingleNode(charPath);
            int x = int.Parse(charNode.SelectSingleNode("@x").Value);
            int y = int.Parse(charNode.SelectSingleNode("@y").Value);
            int width = int.Parse(charNode.SelectSingleNode("@width").Value);
            int height = int.Parse(charNode.SelectSingleNode("@height").Value);

            int leftPixel = x;
            int rightPixel = leftPixel + width - 1;
            int topPixel = (texInfo.Height - 1) - y;
            int bottomPixel = topPixel - height + 1;

            CharacterInfo returnInfo = new CharacterInfo();
            returnInfo.TexCoordLeft = leftPixel / (float) (texInfo.Width - 1);
            returnInfo.TexCoordTop = topPixel / (float)(texInfo.Height - 1);
            returnInfo.TexCoordRight = rightPixel / (float)(texInfo.Width - 1);
            returnInfo.TexCoordBottom = bottomPixel / (float)(texInfo.Height - 1);

            XmlNode commonNode = xRoot.SelectSingleNode("/font/common");
            int charHeight = int.Parse(commonNode.SelectSingleNode("@base").Value);
            int charWidth = int.Parse(charNode.SelectSingleNode("@xadvance").Value);
            int xOffset = int.Parse(charNode.SelectSingleNode("@xoffset").Value);
            int yOffset = int.Parse(charNode.SelectSingleNode("@yoffset").Value);
            returnInfo.CharWidth = width / (float)charWidth;
            returnInfo.CharHeight = height / (float)charHeight;
            returnInfo.CharWidthOffset = xOffset / (float)charWidth;
            returnInfo.CharHeightOffset = yOffset / (float)charHeight;
            returnInfo.CharAspectRatio = charWidth / (float)charHeight;

            return returnInfo;
        }

        private void StoreLoadedFont(string fontInfoSourceString)
        {
            string fontName = fontInfoSourceString.Replace(".fnt", "");
            XmlAsset xmlAsset = ResourceMap.Instance.RetrieveAsset(fontInfoSourceString) as XmlAsset;
            CharacterInfo characterInfo = new CharacterInfo();
            CharacterAsset characterAsset = new CharacterAsset(characterInfo, xmlAsset);
            characterAsset.FontImageName = fontName + ".png";
            ResourceMap.Instance.AsyncLoadComleted(fontName, characterAsset);
        }
    }
}
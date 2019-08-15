
using System.IO;
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

            string charPath = string.Format("font/chars/char[@id=\"{0}\"]", aChar);



            CharacterInfo returnInfo = new CharacterInfo();
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
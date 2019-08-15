using OpenTK.Graphics;
using System;
using System.IO;
using System.Xml;


namespace Engine
{
    enum FileType
    {
        XmlFile, TextFile
    }

    class TextFileLoader
    {
        private static TextFileLoader _instance;

        private TextFileLoader() { }

        public static TextFileLoader Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new TextFileLoader();
                }
                return _instance;
            }
        }

        public async void LoadTextFile(string fileName, FileType fileType, Action<string> callback = null)
        {
            if (!ResourceMap.Instance.IsAssetLoaded(fileName))
            {
                ResourceMap.Instance.AsyncLoadRequested(fileName);

                try
                {
                    using (StreamReader sr = new StreamReader(fileName))
                    {
                        string fileContent = await sr.ReadToEndAsync();
                        var c = GraphicsContext.CurrentContext;

                        if (fileType == FileType.TextFile)
                        {
                            TextAsset textAsset = new TextAsset(fileContent);
                            ResourceMap.Instance.AsyncLoadComleted(fileName, textAsset);
                            if (callback != null)
                            {
                                callback(fileName);
                            }
                        }
                        else if (fileType == FileType.XmlFile)
                        {
                            XmlDocument doc = new XmlDocument();

                            try
                            {
                                doc.LoadXml(fileContent);
                            }
                            catch (Exception e)
                            {
                                Logger.Instance.Print(
                                    "TextFileLoader.cs, Failed to open a file with the name: " +
                                    fileName + ". Message: " + e.Message);
                                return;
                            }

                            XmlAsset xmlAsset = new XmlAsset(doc);
                            ResourceMap.Instance.AsyncLoadComleted(fileName, xmlAsset);
                            if (callback != null)
                            {
                                callback(fileName);
                            }
                        }
                    }
                }
                catch (Exception e)
                {
                    Logger.Instance.Print("TextFleLoader.cs, LoadTextFile(). Message: " + e.Message);
                    return;
                }
            }
            else
            {
                ResourceMap.Instance.IncAssetRefCount(fileName);
            }
        }
    }
}

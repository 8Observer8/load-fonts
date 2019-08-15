
namespace Engine
{
    class TextAsset : Asset
    {
        public string FileContent { get; set; }

        public TextAsset(string fileContent)
        {
            FileContent = fileContent;
        }
    }
}

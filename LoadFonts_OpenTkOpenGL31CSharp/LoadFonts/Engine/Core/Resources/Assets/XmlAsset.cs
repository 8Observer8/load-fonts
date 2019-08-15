

using System.Xml;

namespace Engine
{
    class XmlAsset : Asset
    {
        public XmlDocument XmlContent { get; }

        public XmlAsset(XmlDocument xmlContent)
        {
            XmlContent = xmlContent;
        }
    }
}

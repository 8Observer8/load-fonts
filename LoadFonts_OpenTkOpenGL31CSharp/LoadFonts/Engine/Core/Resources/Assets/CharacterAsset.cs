
namespace Engine
{
    class CharacterAsset : Asset
    {
        private CharacterInfo _characterInfo;
        private XmlAsset _xmlAsset;
        public string FontImageName { get; set; }

        public CharacterAsset(CharacterInfo characterInfo, XmlAsset xmlAsset)
        {
            _characterInfo = characterInfo;
            _xmlAsset = xmlAsset;
        }

        public CharacterInfo CharacterInfo
        {
            get
            {
                return _characterInfo;
            }
        }

        public XmlAsset XmlAsset
        {
            get
            {
                return _xmlAsset;
            }
        }
    }
}

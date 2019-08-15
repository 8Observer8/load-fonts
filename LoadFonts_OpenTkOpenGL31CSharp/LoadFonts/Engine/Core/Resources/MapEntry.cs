
namespace Engine
{
    class MapEntry
    {
        public int RefCount { get; set; }
        public Asset Asset { get; set; }

        public MapEntry()
        {
            RefCount = 1;
            Asset = null;
        }
    }
}

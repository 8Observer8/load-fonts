
using System;
using System.Collections.Generic;

namespace Engine
{
    public class ResourceMap
    {
        private static ResourceMap _instance;
        private Dictionary<string, MapEntry> _resourceMap = new Dictionary<string, MapEntry>();
        private int _numOutstandingLoads = 0;
        private Action _loadCompliteCallback = null;

        private ResourceMap() { }

        public static ResourceMap Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new ResourceMap();
                }
                return _instance;
            }
        }

        public bool IsAssetLoaded(string rName)
        {
            return _resourceMap.ContainsKey(rName);
        }

        public void AsyncLoadRequested(string rName)
        {
            _resourceMap[rName] = new MapEntry();
            ++_numOutstandingLoads;
        }

        public void IncAssetRefCount(string rName)
        {
            _resourceMap[rName].RefCount++;
        }

        public void SetLoadCompleteCallback(Action callback)
        {
            _loadCompliteCallback = callback;
            CheckForAllLoadCompleted();
        }

        public void AsyncLoadComleted(string rName, Asset asset)
        {
            if (!IsAssetLoaded(rName))
            {
                Logger.Instance.Print(string.Format("ResourceMap.cs, AsyncLoadCompleted(). \"{0}\" is not in the map.", rName));
                return;
            }
            _resourceMap[rName].Asset = asset;
            --_numOutstandingLoads;
            CheckForAllLoadCompleted();
        }

        public Asset RetrieveAsset(string rName)
        {
            Asset r = null;
            if (_resourceMap.ContainsKey(rName))
            {
                r = _resourceMap[rName].Asset;
            }
            else
            {
                Logger.Instance.Print(string.Format("ResourceMap.ts, RetrieveAsset(). \"{0}\" is not in the map.", rName));
            }
            return r;
        }

        public void CheckForAllLoadCompleted()
        {
            if (_numOutstandingLoads == 0 && _loadCompliteCallback != null)
            {
                Action callback = _loadCompliteCallback;
                _loadCompliteCallback = null;
                callback();
            }
        }
    }
}

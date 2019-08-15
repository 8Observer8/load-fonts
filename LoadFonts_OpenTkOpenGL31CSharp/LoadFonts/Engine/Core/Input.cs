
using System;
using System.Collections.Generic;

namespace Engine
{
    public enum Key
    {
        Up = 45,
        Down = 46,
        Left = 47,
        Right = 48,

        W = 105,
        S = 101,
        A = 83,
        D = 86
    }

    class Input
    {
        private Dictionary<int, bool> _keyPreviousState = new Dictionary<int, bool>();
        private Dictionary<int, bool> _isKeyPressed = new Dictionary<int, bool>();
        private Dictionary<int, bool> _isKeyClicked = new Dictionary<int, bool>();
        private static Input _instance;

        private Input() { }

        public static Input Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new Input();
                }
                return _instance;
            }
        }

        public void Initialize()
        {
            foreach (Key key in (Key[]) Enum.GetValues(typeof(Key)))
            {
                int keyCode = (int)key;
                _keyPreviousState[keyCode] = false;
                _isKeyPressed[keyCode] = false;
                _isKeyClicked[keyCode] = false;
            }
        }

        public void OnKeyDown(int keyCode)
        {
            if (_isKeyPressed.ContainsKey(keyCode))
            {
                _isKeyPressed[keyCode] = true;
            }
        }

        public void OnKeyUp(int keyCode)
        {
            if (_isKeyPressed.ContainsKey(keyCode))
            {
                _isKeyPressed[keyCode] = false;
            }
        }

        public void Update()
        {
            foreach (Key key in (Key[])Enum.GetValues(typeof(Key)))
            {
                int keyCode = (int)key;
                _isKeyClicked[keyCode] = (!_keyPreviousState[keyCode]) && _isKeyPressed[keyCode];
                _keyPreviousState[keyCode] = _isKeyPressed[keyCode];
            }
        }

        public bool IsKeyPressed(int keyCode)
        {
            return _isKeyPressed[keyCode];
        }

        public bool IsKeyClicked(int keyCode)
        {
            return (_isKeyClicked[keyCode]);
        }
    }
}

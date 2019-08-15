import Screen from "./Scene";
import EngineCore from "./Engine/EngineCore";

class Program
{
    public static Main(): void
    {
        let scene = new Screen();
        EngineCore.Instance.Initialize("renderCanvas", scene);
    }
}

// Debug Version
// Program.Main();

// Release Version
window.onload = () => Program.Main();

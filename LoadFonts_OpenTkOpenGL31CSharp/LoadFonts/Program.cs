
using System.Threading;

namespace LoadFonts
{
    class Program
    {
        static void Main(string[] args)
        {
            Thread.CurrentThread.CurrentCulture = System.Globalization.CultureInfo.InvariantCulture;

            using (MainWindow mainWindow = new MainWindow())
            {
                mainWindow.Run(60);
            }
        }
    }
}

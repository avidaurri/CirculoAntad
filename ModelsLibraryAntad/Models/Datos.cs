using System;
using System.Collections.Generic;
using System.Text;

namespace ModelsLibraryAntad.Models
{
    public class Datos
    {
        /*public string nombre { get; set; }
        public string apellido { get; set; }
        public string ciudad { get; set; }*/

        public List<Datoss> listadatos { get; set; } //2

        public class Datoss
        {
            public string nombre { get; set; }
            public string apellido { get; set; }
            public string ciudad { get; set; }

        }

    }
}

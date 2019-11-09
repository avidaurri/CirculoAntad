using System;
using System.Collections.Generic;
using System.Text;

namespace ModelsLibraryAntad.Models
{
    public class ParamValidarEvento
    {
        public int idUsuario { get; set; }
        public int idIntramuro { get; set; }
        public int idEvento { get; set; }
        public string usuario { get; set; }
        public string folioEvento { get; set; }
        public int clvEdoEventoActual { get; set; }
        public int clvEdoEventoNuevo { get; set; }
        public string mensajeValidacion { get; set; }
        public bool seValido { get; set; }
    }
}

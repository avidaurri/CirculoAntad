using System;
using System.Collections.Generic;
using System.Text;

namespace ModelsLibraryAntad.Models
{
    public class Empleado
    {
        public int clv_emp { get; set; }
        public string nombre { get; set; }
        public string genero { get; set; }
        public string edo_civil { get; set; }
        public string puesto { get; set; }
        public int clv_puesto { get; set; }
        public string nss { get; set; }
        public double estatura { get; set; }
        public double peso { get; set; }
        public int cumplerequisitos { get; set; }
        public int edad { get; set; }
        public int calificacionnumero { get; set; }
        public string mensajeValidacion { get; set; }
        public string calificacion_empleado { get; set; }
        public string estado { get; set; }
        public string municipio { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace ModelsLibraryAntad.Models
{
    public class AgrupadorCentroTrabajo
    {
        public int clv_agrupador_centro_trabajo { get; set; }
        public int clv_region { get; set; }
        public string descripcion { get; set; }
        public string folio_dominio { get; set; }
        public string clv_cli { get; set; }
        public string folio_proyecto { get; set; }
        public string tipo { get; set; }

    }
}

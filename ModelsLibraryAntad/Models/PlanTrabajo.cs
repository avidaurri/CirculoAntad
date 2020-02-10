using System;
using System.Collections.Generic;
using System.Text;

namespace ModelsLibraryAntad.Models
{
    public class PlanTrabajo
    {
        public string proyecto { get; set; }
        public string folio_proyecto { get; set; } //si
        public string descripcion { get; set; } //si
        public string fecha_ini { get; set; } //si
        public string fecha_fin { get; set; } //si
        public string folio_trabajo { get; set; }
        public string folio_dominio { get; set; }
        public string dominio { get; set; }
        public string fecha_captura { get; set; }
        public int guardado { get; set; }
        public string estado { get; set; }
        public List<TemporalidadPlan> listaTemporalidad { get; set; } //2
        public class TemporalidadPlan
        {
            public int folio_trabajo { get; set; }
            public int consec_temporalidad { get; set; }//si
            public string fecha_inicial { get; set; }//si
            public string fecha_final { get; set; }//si
            public int lun { get; set; }//si
            public int mar { get; set; }//si
            public int mie { get; set; }//si
            public int jue { get; set; }//si
            public int vie { get; set; }//si
            public int sab { get; set; }//si
            public int dom { get; set; }//si
            public string descripcion { get; set; }//si
        }
        public List<CentroTrabajoPlan> listaCentroTrabajo { get; set; } //2
        public class CentroTrabajoPlan
        {
            public int consec_centro_trabajo { get; set; }//si
            public int consec_temporalidad { get; set; }//si
            public string folio_centro_trabajo { get; set; }//si
            public string origen { get; set; }//si

        }
        public List<EmpleadoPlan> listaEmpleados { get; set; } //2
        public class EmpleadoPlan
        {
            public string folio_centro_trabajo { get; set; }
            public string folio_trabajo { get; set; }
            public int consec_empleado { get; set; }//si
            public int consec_centro_trabajo { get; set; }//si
            public int consec_temporalidad { get; set; }//si
            public int clv_emp { get; set; }//si
            public string origen { get; set; }//si

        }
        public List<ActividadPlan> listaActividades { get; set; } //2
        public class ActividadPlan
        {
            public string folio_trabajo { get; set; }
            public int consec_actividad { get; set; }//si
            public int consec_empleado { get; set; }//si
            public int consec_centro_trabajo { get; set; }//si
            public int consec_temporalidad { get; set; }//si
            public int clv_actividad { get; set; }//si
            public string descripcion { get; set; }
            public string origen { get; set; }//si




        }

    }
}

using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class PlanTrabajoService
    {
        private PlanTrabajoDAO PlanTrabajoDatos;

        public PlanTrabajoService(string cadena)
        {
            PlanTrabajoDatos = new PlanTrabajoDAO(cadena);
        }

        public PlanTrabajo guardarPlanTrabajo(PlanTrabajo plan)
        {

            return PlanTrabajoDatos.guardarPlanTrabajo(plan);
        }

        public List<PlanTrabajo> ConsultarPlanes(PlanTrabajo plan)
        {
            return PlanTrabajoDatos.ConsultarPlanes(plan);
        }


    }
}

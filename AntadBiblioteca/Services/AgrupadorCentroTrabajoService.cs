using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class AgrupadorCentroTrabajoService
    {
        private AgrupadorCentroTrabajoDAO AgrupadorCentroTrabajoDAO;
        public AgrupadorCentroTrabajoService(string cadena)
        {
            AgrupadorCentroTrabajoDAO = new AgrupadorCentroTrabajoDAO(cadena);
        }

        public List<AgrupadorCentroTrabajo> ObtenerAgrupadoresCentroTrabajo(AgrupadorCentroTrabajo agrupador)
        {
            return AgrupadorCentroTrabajoDAO.ObtenerAgrupadoresCentroTrabajo(agrupador);
        }
    }
}

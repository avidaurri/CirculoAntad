using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class CentroTrabajoService
    {
        private CentroTrabajoDAO CentroTrabajoDAO;
        public CentroTrabajoService(string cadena)
        {
            CentroTrabajoDAO = new CentroTrabajoDAO(cadena);
        }

        public List<CentroTrabajo> ConsultarCentrosTrabajo(UserSessionWeb login)
        {
            return CentroTrabajoDAO.ConsultarCentrosTrabajo(login);
        }

        public List<CentroTrabajo> ConsultarCentrosTrabajoAgrupador(AgrupadorCentroTrabajo agrupador)
        {
            return CentroTrabajoDAO.ConsultarCentrosTrabajoAgrupador(agrupador);
        }
        
    }
}

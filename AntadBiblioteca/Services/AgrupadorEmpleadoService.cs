using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class AgrupadorEmpleadoService
    {
        private AgrupadorEmpleadoDAO AgrupadorEmpleadoDAO;
        public AgrupadorEmpleadoService(string cadena)
        {
            AgrupadorEmpleadoDAO = new AgrupadorEmpleadoDAO(cadena);
        }

        public List<AgrupadorEmpleado> ObtenerAgrupadoresEmpleado(AgrupadorEmpleado agrupador)
        {
            return AgrupadorEmpleadoDAO.ObtenerAgrupadoresEmpleado(agrupador);
        }
    }
}

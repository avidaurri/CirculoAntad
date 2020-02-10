using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class RequisitoEmpleadoService
    {
        private RequisitoEmpleadoDAO ActividadDAO;
        public RequisitoEmpleadoService(string cadena)
        {
            ActividadDAO = new RequisitoEmpleadoDAO(cadena);
        }



        public List<RequisitoEmpleado> ObtenerRequisitosEmpleado(ActividadWeb actividad)
        {
            return ActividadDAO.ObtenerRequisitosEmpleado(actividad);
        }
    }
}

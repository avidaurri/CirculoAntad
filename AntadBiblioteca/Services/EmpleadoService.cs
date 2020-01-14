using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class EmpleadoService
    {
        private EmpleadoDAO EmpleadoDAO;
        public EmpleadoService(string cadena)
        {
            EmpleadoDAO = new EmpleadoDAO(cadena);
        }

        public List<Empleado> ConsultarEmpleados(UserSessionWeb login)
        {
            return EmpleadoDAO.ConsultarEmpleados(login);
        }
    }
}

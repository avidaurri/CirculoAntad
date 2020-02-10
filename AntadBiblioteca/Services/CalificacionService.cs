using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class CalificacionService
    {
        private CalificacionDAO CalificacionDAO;
        public CalificacionService(string cadena)
        {
            CalificacionDAO = new CalificacionDAO(cadena);
        }

        public List<Calificacion> ConsultarCalificaciones(UserSessionWeb login)
        {
            return CalificacionDAO.ConsultarCalificaciones(login);
        }
    }
}

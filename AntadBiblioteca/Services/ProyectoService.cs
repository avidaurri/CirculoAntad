using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class ProyectoService
    {
        private ProyectoDAO ProyectoDAO;
        public ProyectoService(string cadena)
        {
            ProyectoDAO = new ProyectoDAO(cadena);
        }

        public List<Proyecto> ConsultarProyectos(UserSessionWeb login)
        {
            return ProyectoDAO.ConsultarProyectos(login);
        }
    }
}

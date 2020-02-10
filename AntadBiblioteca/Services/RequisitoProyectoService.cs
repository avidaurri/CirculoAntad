using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class RequisitoProyectoService
    {
        private RequisitoProyectoDAO RequisitoDAO;
        public RequisitoProyectoService(string cadena)
        {
            RequisitoDAO = new RequisitoProyectoDAO(cadena);
        }


        public List<RequisitoProyecto> ObtenerRequisitosproyecto(ActividadWeb actividad)
        {
            return RequisitoDAO.ObtenerRequisitosproyecto(actividad);
        }
    }
}

using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class EstadoService
    {
        private EstadoDAO EstadoDAO;
        public EstadoService(string cadena)
        {
            EstadoDAO = new EstadoDAO(cadena);
        }

        public List<Estado> ConsultarEstados(UserSessionWeb login)
        {
            return EstadoDAO.ConsultarEstados(login);
        }
    }
}

using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class MarcaService
    {
        private MarcaDAO MarcaDAO;
        public MarcaService(string cadena)
        {
            MarcaDAO = new MarcaDAO(cadena);
        }

        public List<Marca> ConsultarMarcas(UserSessionWeb login)
        {
            return MarcaDAO.ConsultarMarcas(login);
        }
    }
}

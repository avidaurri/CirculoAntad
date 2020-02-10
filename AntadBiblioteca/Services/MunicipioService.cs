using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class MunicipioService
    {
        private MunicipioDAO MunicipioDAO;
        public MunicipioService(string cadena)
        {
            MunicipioDAO = new MunicipioDAO(cadena);
        }

        public List<Municipio> ConsultarMunicipios(Estado estado)
        {
            return MunicipioDAO.ConsultarMunicipios(estado);
        }
    }
}

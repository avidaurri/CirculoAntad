using AntadBiblioteca.Services;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CirculoAntadAPI.Controllers
{
    public class MarcaController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/Marca
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Marca/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Marca
        public List<Marca> Post([FromBody]UserSessionWeb login)
        {
            MarcaService servicio = new MarcaService(cadenaConexion);
            return servicio.ConsultarMarcas(login);
        }

        // PUT: api/Marca/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Marca/5
        public void Delete(int id)
        {
        }
    }
}

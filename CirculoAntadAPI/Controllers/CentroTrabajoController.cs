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
    public class CentroTrabajoController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/CentroTrabajo
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/CentroTrabajo/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CentroTrabajo
        public List<CentroTrabajo> Post([FromBody]UserSessionWeb login)
        {
            CentroTrabajoService servicio = new CentroTrabajoService(cadenaConexion);
            return servicio.ConsultarCentrosTrabajo(login);
        }

        // PUT: api/CentroTrabajo/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/CentroTrabajo/5
        public void Delete(int id)
        {
        }
    }
}

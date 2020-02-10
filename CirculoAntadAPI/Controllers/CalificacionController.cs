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
    public class CalificacionController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/Calificacion
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Calificacion/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Calificacion
        public List<Calificacion> Post([FromBody]UserSessionWeb login)
        {
            CalificacionService servicio = new CalificacionService(cadenaConexion);
            return servicio.ConsultarCalificaciones(login);
        }

        // PUT: api/Calificacion/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Calificacion/5
        public void Delete(int id)
        {
        }
    }
}

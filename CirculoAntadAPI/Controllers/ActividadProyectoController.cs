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
    public class ActividadProyectoController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/ActividadProyecto
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ActividadProyecto/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ActividadProyecto
        public List<ActividadWeb> Post([FromBody]ActividadWeb actividad)
        {
            ActividadService servicio = new ActividadService(cadenaConexion);
            return servicio.ObtenerActividadproyecto(actividad);
        }

        // PUT: api/ActividadProyecto/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ActividadProyecto/5
        public void Delete(int id)
        {
        }
    }
}

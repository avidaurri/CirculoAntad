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
    public class PlanTrabajoController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/PlanTrabajo
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/PlanTrabajo/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/PlanTrabajo
        public PlanTrabajo Post([FromBody]PlanTrabajo value)
        {
            //var path = Path.Combine(HttpContext.Current.Server.MapPath("foede"), "name");
            PlanTrabajoService servicio = new PlanTrabajoService(cadenaConexion);
            return servicio.guardarPlanTrabajo(value);
        }

        // PUT: api/PlanTrabajo/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/PlanTrabajo/5
        public void Delete(int id)
        {
        }
    }
}

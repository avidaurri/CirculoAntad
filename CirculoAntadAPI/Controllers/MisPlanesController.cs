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
    public class MisPlanesController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/MisPlanes
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/MisPlanes/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/MisPlanes
        public List<PlanTrabajo> Post([FromBody]PlanTrabajo plan)
        {

            PlanTrabajoService servicio = new PlanTrabajoService(cadenaConexion);
            return servicio.ConsultarPlanes(plan);
        }


        // PUT: api/MisPlanes/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/MisPlanes/5
        public void Delete(int id)
        {
        }
    }
}

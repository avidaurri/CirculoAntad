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
    public class RequisitosEmpleadoController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/RequisitosEmpleado
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/RequisitosEmpleado/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/RequisitosEmpleado
        public List<RequisitoEmpleado> Post([FromBody]ActividadWeb actividad)
        {
            RequisitoEmpleadoService servicio = new RequisitoEmpleadoService(cadenaConexion);
            return servicio.ObtenerRequisitosEmpleado(actividad);
        }

        // PUT: api/RequisitosEmpleado/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/RequisitosEmpleado/5
        public void Delete(int id)
        {
        }
    }
}

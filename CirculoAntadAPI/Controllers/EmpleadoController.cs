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
    public class EmpleadoController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/Empleado
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Empleado/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Empleado
        public List<Empleado> Post([FromBody]UserSessionWeb login)
        {
            EmpleadoService servicio = new EmpleadoService(cadenaConexion);
            return servicio.ConsultarEmpleados(login);
        }

        // PUT: api/Empleado/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Empleado/5
        public void Delete(int id)
        {
        }
    }
}

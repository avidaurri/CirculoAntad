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
    public class EmpleadoAgrupadorController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/EmpleadoAgrupador
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/EmpleadoAgrupador/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/EmpleadoAgrupador
        public List<Empleado> Post([FromBody]AgrupadorEmpleado agrupador)
        {
            EmpleadoService servicio = new EmpleadoService(cadenaConexion);
            return servicio.ConsultarEmpleadosAgrupador(agrupador);
        }

        // PUT: api/EmpleadoAgrupador/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EmpleadoAgrupador/5
        public void Delete(int id)
        {
        }
    }
}

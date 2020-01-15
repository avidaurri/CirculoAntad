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
    public class AgrupadorEmpleadoController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/AgrupadorEmpleado
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/AgrupadorEmpleado/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/AgrupadorEmpleado
        public List<AgrupadorEmpleado> Post([FromBody]AgrupadorEmpleado agrupador)
        {
            AgrupadorEmpleadoService servicio = new AgrupadorEmpleadoService(cadenaConexion);
            return servicio.ObtenerAgrupadoresEmpleado(agrupador);
        }

        // PUT: api/AgrupadorEmpleado/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/AgrupadorEmpleado/5
        public void Delete(int id)
        {
        }
    }
}

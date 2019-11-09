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
    public class ValidaEventoController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadd"].ConnectionString;
        // GET: api/ValidaEvento
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ValidaEvento/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ValidaEvento
        public ValidaEvento Post([FromBody]ValidaEvento validacion)
        {
            ValidaEventoService servicio = new ValidaEventoService(cadenaConexion);
            return servicio.getValidacionEvento(validacion.clv_Empleado, validacion.folioEvento);
        }

        // PUT: api/ValidaEvento/5
        public ParamValidarEvento Put(int id, [FromBody]ParamValidarEvento value)
        {
            ValidaEventoService servicio = new ValidaEventoService(cadenaConexion);
            return servicio.ValidarEvento(id, value);
        }

        // DELETE: api/ValidaEvento/5
        public void Delete(int id)
        {
        }
    }
}

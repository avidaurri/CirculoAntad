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
    public class CentroTrabajoAgrupadorController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;

        // GET: api/CentroTrabajoAgrupador
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/CentroTrabajoAgrupador/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CentroTrabajoAgrupador
        public List<CentroTrabajo> Post([FromBody]AgrupadorCentroTrabajo agrupador)
        {
            CentroTrabajoService servicio = new CentroTrabajoService(cadenaConexion);
            return servicio.ConsultarCentrosTrabajoAgrupador(agrupador);
        }

        // PUT: api/CentroTrabajoAgrupador/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/CentroTrabajoAgrupador/5
        public void Delete(int id)
        {
        }
    }
}

﻿using AntadBiblioteca.Services;
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
    public class RequisitoProyectoController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/RequisitoProyecto
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/RequisitoProyecto/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/RequisitoProyecto
        public List<RequisitoProyecto> Post([FromBody]ActividadWeb actividad)
        {
            RequisitoProyectoService servicio = new RequisitoProyectoService(cadenaConexion);
            return servicio.ObtenerRequisitosproyecto(actividad);
        }

        // PUT: api/RequisitoProyecto/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/RequisitoProyecto/5
        public void Delete(int id)
        {
        }
    }
}

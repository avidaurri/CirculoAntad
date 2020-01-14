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
    public class ActividadController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadNew"].ConnectionString;
        // GET: api/Actividad
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Actividad/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Actividad
        public List<Actividad> Post([FromBody]UserSessionWeb login)
        {
            ActividadService servicio = new ActividadService(cadenaConexion);
            return servicio.ConsultarActividades(login);
        }

        // PUT: api/Actividad/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Actividad/5
        public void Delete(int id)
        {
        }
    }
}

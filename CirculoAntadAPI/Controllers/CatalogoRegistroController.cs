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
    public class CatalogoRegistroController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadd"].ConnectionString;
        // GET: api/CatalogoRegistro
        /*public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }*/

        // GET: api/CatalogoRegistro/5
        public CatalogoRegistro Get()
        {
            CatalogoRegistroService servicio = new CatalogoRegistroService(cadenaConexion);
            return servicio.getCatalogo();
        }

        // POST: api/CatalogoRegistro
        public CatalogoRegistro Post([FromBody]int idEstado)
        {
            CatalogoRegistroService servicio = new CatalogoRegistroService(cadenaConexion);
            return servicio.getMunicipios(idEstado);
        }

        // PUT: api/CatalogoRegistro/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/CatalogoRegistro/5
        public void Delete(int id)
        {
        }
    }
}

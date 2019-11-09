﻿using AntadBiblioteca.Services;
using CirculoAntadAPI.Helpers;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CirculoAntadAPI.Controllers
{
    public class RegistroController : ApiController
    {
        public string cadenaConexion = ConfigurationManager.ConnectionStrings["ConexionAntadd"].ConnectionString;
        // GET: api/Registro
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Registro/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Registro
        public Registro Post([FromBody]Registro value)
        {
            //var path = Path.Combine(HttpContext.Current.Server.MapPath("foede"), "name");
            RegistroService servicio = new RegistroService(cadenaConexion);

            //subir iagen
            if (value.ImageArray != null && value.ImageArray.Length > 0)
            {
                var stream = new MemoryStream(value.ImageArray);
                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.jpg";
                var folder = "~/Content/Usuarios";
                var fullPath = $"{folder}/{file}";
                var response = FilesHelper.UploadPhoto(stream, folder, file);

                if (response)
                {
                    value.foto = file;
                }
            }

            if (value.IdentificacionArray != null && value.IdentificacionArray.Length > 0)
            {
                var stream = new MemoryStream(value.IdentificacionArray);
                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.jpg";
                var folder = "~/Content/Iden";
                var fullPath = $"{folder}/{file}";
                var response = FilesHelper.UploadPhoto(stream, folder, file);

                if (response)
                {
                    value.identificacion = file;
                }
            }

            if (value.ComprobanteArray != null && value.ComprobanteArray.Length > 0)
            {
                var stream = new MemoryStream(value.ComprobanteArray);
                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.jpg";
                var folder = "~/Content/Com";
                var fullPath = $"{folder}/{file}";
                var response = FilesHelper.UploadPhoto(stream, folder, file);

                if (response)
                {
                    value.comprobanteDomiciliario = file;
                }
            }

            return servicio.PostRegistro(value);
        }

        // PUT: api/Registro/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Registro/5
        public void Delete(int id)
        {
        }
    }
}

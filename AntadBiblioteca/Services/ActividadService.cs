﻿using AntadBiblioteca.DAO;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.Services
{
    public class ActividadService
    {
        private ActividadDAO ActividadDAO;
        public ActividadService(string cadena)
        {
            ActividadDAO = new ActividadDAO(cadena);
        }

        public List<ActividadWeb> ConsultarActividades(UserSessionWeb login)
        {
            return ActividadDAO.ConsultarActividades(login);
        }

        public List<ActividadWeb> ObtenerActividadproyecto(ActividadWeb actividad)
        {
            return ActividadDAO.ObtenerActividadproyecto(actividad);
        }

        
    }
}

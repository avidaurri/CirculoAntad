﻿using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CirculoAntadWeb.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
           /* if (Session["UsuarioSession"] != null)
            {
                return RedirectToAction("MisTickets", "Home");
            }*/

            return View();
        }

        public string CrearSession(UserSession objLogin)
        {

            int clvEmp = objLogin.clvEmp;
            int edad = objLogin.edad;
            string genero = objLogin.genero;
            int clvGen = objLogin.clvGen;
            string nombre = objLogin.nombre;
            string usuario = objLogin.usuario;
            string password = objLogin.password;
            string foto = objLogin.foto;
            int clvPuesto = objLogin.clvPuesto;
            string puesto = objLogin.puesto;
            string mensajeLogin = objLogin.mensajeLogin;
            bool seLogeo = objLogin.seLogeo;



            Session["UsuarioSession"] = objLogin;
            return "OK";
        }

        public ActionResult CerrarSesion()
        {
            //FINALIZAMOS SESION

            Session.Abandon();
            return RedirectToAction("Index", "Login");
        }
    }
}
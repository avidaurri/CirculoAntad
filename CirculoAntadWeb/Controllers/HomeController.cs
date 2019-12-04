using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CirculoAntadWeb.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult MisTickets() //si
        {

            //LISTA DE CLIENTES POR POST

            if (Session["UsuarioSession"] == null)
            {
                //Response.Redirect("~/Login/Index");
                return RedirectToAction("Index", "Login");
            }

            //LISTA DE CLIENTES POR POST

            UserSession objLogin = (UserSession)Session["UsuarioSession"];

            ViewData["nombreUsuario"] = objLogin.nombre;
            ViewData["tipoUsuario"] = objLogin.clvPuesto;
            ViewData["ClvUsuario"] = objLogin.clvEmp;
            ViewData["Avatar"] = objLogin.foto;
            ViewData["EmailUsuario"] = objLogin.nombre;
            ViewData["TelefonoUsuario"] = "7241";

            string baseUrl = Request.Url.GetLeftPart(UriPartial.Authority);
            ViewData["Url"] = baseUrl;


                ViewData["VisualizarHistorico"] = "1";

                ViewData["EditarHistorico"] = "1";
 


            int isAdmin;

                isAdmin = 1;

            ViewData["administradorUsuario"] = isAdmin;
            return View();


        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
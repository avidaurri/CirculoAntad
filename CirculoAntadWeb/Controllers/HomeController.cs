using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];



            ViewData["usuario"] = objLogin.usuario;
            ViewData["agencia"] = objLogin.agencia;
            ViewData["folioAgencia"] = objLogin.folioAgencia;


            string baseUrl = Request.Url.GetLeftPart(UriPartial.Authority);
            ViewData["Url"] = baseUrl;


                /*ViewData["VisualizarHistorico"] = "1";

                ViewData["EditarHistorico"] = "1";
 


            int isAdmin;

                isAdmin = 1;

            ViewData["administradorUsuario"] = isAdmin;*/
            return View();


        }

        public ActionResult MisPlanes() //si
        {

            //LISTA DE CLIENTES POR POST

            if (Session["UsuarioSession"] == null)
            {
                //Response.Redirect("~/Login/Index");
                return RedirectToAction("Index", "Login");
            }

            //LISTA DE CLIENTES POR POST

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];

            ViewData["usuario"] = objLogin.usuario;
            ViewData["agencia"] = objLogin.agencia;
            ViewData["folioAgencia"] = objLogin.folioAgencia;

            string baseUrl = Request.Url.GetLeftPart(UriPartial.Authority);
            ViewData["Url"] = baseUrl;

            return View();


        }



        public ActionResult NuevoPlan() //si
        {

            //LISTA DE CLIENTES POR POST

            if (Session["UsuarioSession"] == null)
            {
                //Response.Redirect("~/Login/Index");
                return RedirectToAction("Index", "Login");
            }

            //LISTA DE CLIENTES POR POST

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];

            ViewData["usuario"] = objLogin.usuario;
            ViewData["agencia"] = objLogin.agencia;
            ViewData["folioAgencia"] = objLogin.folioAgencia;


            string baseUrl = Request.Url.GetLeftPart(UriPartial.Authority);
            ViewData["Url"] = baseUrl;

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


        public ActionResult ObtenerProyectos() //si
        {

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Proyecto", objLogin).Result;
            return Json(response.Content.ReadAsAsync<List<Proyecto>>().Result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult ObtenerCentrosTrabajo() //si
        {

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("CentroTrabajo", objLogin).Result;
            return Json(response.Content.ReadAsAsync<List<CentroTrabajo>>().Result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult ObtenerEmpleados() //si
        {

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Empleado", objLogin).Result;
            return Json(response.Content.ReadAsAsync<List<Empleado>>().Result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult ObtenerActividades() //si
        {

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Actividad", objLogin).Result;
            return Json(response.Content.ReadAsAsync<List<Actividad>>().Result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult ObtenerMarcas() //si
        {

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Marca", objLogin).Result;
            return Json(response.Content.ReadAsAsync<List<Marca>>().Result, JsonRequestBehavior.AllowGet);

        }

    }
}
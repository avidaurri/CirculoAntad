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

        public ActionResult EditarPlan(string plan) //si
        {

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
            ViewBag.foliotrabajo = plan;
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

        public ActionResult Tablero() //si
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
        public ActionResult NuevoPlanG() //si
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
            objLogin.filtrogenero = "";
           // objLogin.filtroedocivil = "";
            objLogin.filtropuesto = "";
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Empleado", objLogin).Result;
            return Json(response.Content.ReadAsAsync<List<Empleado>>().Result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult ObtenerActividades() //si
        {

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Actividad", objLogin).Result;
            return Json(response.Content.ReadAsAsync<List<ActividadWeb>>().Result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult ObtenerMarcas() //si
        {

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Marca", objLogin).Result;
            return Json(response.Content.ReadAsAsync<List<Marca>>().Result, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ObtenerEstados(AgrupadorCentroTrabajo agrupador) //si
        {

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Estado", objLogin).Result;
            return Json(response.Content.ReadAsAsync<List<Estado>>().Result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult ObtenerMunicipios(Estado estado) //si
        {

            //UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Municipio", estado).Result;
            return Json(response.Content.ReadAsAsync<List<Municipio>>().Result, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ObtenerCalificaciones() //si
        {

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Calificacion", objLogin).Result;
            return Json(response.Content.ReadAsAsync<List<Calificacion>>().Result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult ObtenerAgrupacionCentrosTrabajo(AgrupadorCentroTrabajo agrupador) //si
        {
            //mandar datos a master page
            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];

            AgrupadorCentroTrabajo miAgrupador = new AgrupadorCentroTrabajo();
            miAgrupador.folio_proyecto = agrupador.folio_proyecto;
            miAgrupador.folio_dominio = objLogin.folioAgencia;



            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("AgrupadorCentroTrabajo", miAgrupador).Result;
            return Json(response.Content.ReadAsAsync<List<AgrupadorCentroTrabajo>>().Result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult ObtenerCentrosTrabajoDeAgrupacion(AgrupadorCentroTrabajo agrupador) //si
        {
            //mandar datos a master page
            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];

            AgrupadorCentroTrabajo miAgrupador = new AgrupadorCentroTrabajo();
            miAgrupador.clv_agrupador_centro_trabajo = agrupador.clv_agrupador_centro_trabajo;



            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("CentroTrabajoAgrupador", miAgrupador).Result;
            return Json(response.Content.ReadAsAsync<List<CentroTrabajo>>().Result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ObtenerAgrupacionEmpleado(AgrupadorEmpleado agrupador) //si
        {
            //mandar datos a master page
            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];

            AgrupadorEmpleado miAgrupador = new AgrupadorEmpleado();
            miAgrupador.folio_proyecto = agrupador.folio_proyecto;
            miAgrupador.folio_dominio = objLogin.folioAgencia;



            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("AgrupadorEmpleado", miAgrupador).Result;
            return Json(response.Content.ReadAsAsync<List<AgrupadorEmpleado>>().Result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult ObtenerActividadesProyecto(ActividadWeb actividad) //si
        {

            ActividadWeb miActividad = new ActividadWeb();
            miActividad.folio_proyecto = actividad.folio_proyecto;


            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("ActividadProyecto", miActividad).Result;
            return Json(response.Content.ReadAsAsync<List<ActividadWeb>>().Result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult ObtenerRequisitosEmpleado(ActividadWeb actividad) //si
        {

            ActividadWeb miActividad = new ActividadWeb();
            miActividad.folio_proyecto = actividad.folio_proyecto;
    

            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("RequisitosEmpleado", miActividad).Result;
            return Json(response.Content.ReadAsAsync<List<RequisitoEmpleado>>().Result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ObtenerRequisitosCampania(ActividadWeb actividad) //si
        {

            ActividadWeb miActividad = new ActividadWeb();
            miActividad.folio_proyecto = actividad.folio_proyecto;


            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("RequisitoProyecto", miActividad).Result;
            return Json(response.Content.ReadAsAsync<List<RequisitoProyecto>>().Result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ObtenerEmpleadosDeAgrupacion(AgrupadorEmpleado agrupador) //si
        {
            //mandar datos a master page
            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];

            AgrupadorEmpleado miAgrupador = new AgrupadorEmpleado();
            miAgrupador.clv_agrupador_empleado = agrupador.clv_agrupador_empleado;
            miAgrupador.folio_proyecto = agrupador.folio_proyecto;


            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("EmpleadoAgrupador", miAgrupador).Result;
            return Json(response.Content.ReadAsAsync<List<Empleado>>().Result, JsonRequestBehavior.AllowGet);

        }


        public JsonResult ObtenerDatosEjemplo(Datos agrupador) //si
        {
            //mandar datos a master page
            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];

            AgrupadorEmpleado miAgrupador = new AgrupadorEmpleado();
            miAgrupador.clv_agrupador_empleado = 02;



            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("EmpleadoAgrupador", miAgrupador).Result;
            return Json(response.Content.ReadAsAsync<List<Empleado>>().Result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GuardarPlanTrabajo(PlanTrabajo plan) //si
        {
            //mandar datos a master page
            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            plan.folio_dominio = objLogin.folioAgencia;
            //PlanTrabajo miAgrupador = new PlanTrabajo();
            //miAgrupador.clv_agrupador_empleado = 02;

            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("PlanTrabajo", plan).Result;
            return Json(response.Content.ReadAsAsync<PlanTrabajo>().Result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult ObtenerEmpleadosdata(string filtrogenero, string filtrocalificacion, string filtropuesto, string folioproyecto, string filtroestado,string filtromunicipio) //si
        {

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];
            objLogin.filtrogenero = filtrogenero;
            objLogin.filtrocalificacion = filtrocalificacion;
            objLogin.filtropuesto = filtropuesto;
            objLogin.folioProyecto = folioproyecto;
            objLogin.filtroestado = filtroestado;
            objLogin.filtromunicipio = filtromunicipio;
            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("Empleado", objLogin).Result;
            return Json(new { data = response.Content.ReadAsAsync<List<Empleado>>().Result }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult ObtenerListaPlanes(string filtrogenero) //si
        {

            //string condicion="mistickets";
            PlanTrabajo lstPlanes= new PlanTrabajo();

            UserSessionWeb objLogin = (UserSessionWeb)Session["UsuarioSession"];

            lstPlanes.folio_dominio = objLogin.agencia;

            HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("MisPlanes", lstPlanes).Result;

            return Json(new { data = response.Content.ReadAsAsync<List<PlanTrabajo>>().Result }, JsonRequestBehavior.AllowGet);

        }


    }
}
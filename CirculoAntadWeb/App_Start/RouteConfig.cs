using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CirculoAntadWeb
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Login", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "EditarPlan",
                url: "{controller}/{action}/{plan}",
                defaults: new { controller = "Home", action = "EditarPlan", plan = "hola" }
            );


            /*routes.MapRoute(
                name: "EditarPlan",
                url: "EditarPlan/{*plan}",
                defaults: new { controller = "Home", action = "EditarPlan"}
            );*/

        }
    }
}

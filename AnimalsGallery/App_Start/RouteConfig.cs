﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace AnimalsGallery
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "AngularRoute",
                url: "Angular/{*url}",
                defaults: new { controller = "Home", action = "Index" }
                );
            routes.MapRoute(
                name: "PictureRoutes",
                url: "Pictures/Picture/{albumName}",
                defaults: new { controller="Pictures", action="Picture", albumName = "pandaria"}
                );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}

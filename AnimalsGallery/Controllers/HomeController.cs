using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AnimalsGallery.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = "User")]
        public ActionResult Gallery()
        {
            return View();
        }

        public ActionResult Albums()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
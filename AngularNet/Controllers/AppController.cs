using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularNet.Controllers
{
    public class AppController : Controller
    {
        // GET: App
        public ActionResult TripApp()
        {
            return View();
        }
        public ActionResult TripAppMaterial()
        {
            return View();
        }
    }
}
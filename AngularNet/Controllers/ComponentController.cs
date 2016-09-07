using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularNet.Controllers
{
    public class ComponentController : Controller
    {
        // GET: Component
        public ActionResult TripEntryGrid()
        {
            return View();
        }
        public ActionResult TripInlineGrid()
        {
            return View();
        }

        public ActionResult TripNavToForm()
        {
            return View();
        }
        public ActionResult TripPopupGrid()
        {
            return View();
        }
        public ActionResult TripSideFormGrid()
        {
            return View();
        }

        public ActionResult TripForm()
        {
            return View();
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AngularNet.Models;

namespace AngularNet.Controllers
{
    public class RefController : ApiController
    {
        // Refecence Controller
        //
        [ResponseType(typeof (RefModel))]
        public IHttpActionResult Get()
        {
            RefModel model = null;
            try
            {
                var refDao = new RefDao();
                model = refDao.getRefs();
                return Ok(model);
            }
            catch (Exception e)
            {
                return BadRequest(Util.dbErrorMessage("Can't get reference dataset", e));
            }
        }


    }
}

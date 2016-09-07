using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularNet.Models;

namespace AngularNet.Controllers
{
    public class LookupController : ApiController
    {
        private TripEntities db = new TripEntities();

        [Route("~/api/Lookup/Iata/{term}")]
        [HttpGet]
        public LookupItem[] Iata(string term)
        {
            var q = db.Airports
                .Where(c => c.IataIdent.StartsWith(term))
                .OrderBy(c => c.IataIdent)
                .Take(15)
                .Select(c => new LookupItem()
                {
                    value = (int) c.AirportId,
                    text = c.IataIdent,
                    text2 = c.Name
                })
                .ToArray();


            return q;

        }
    }
}
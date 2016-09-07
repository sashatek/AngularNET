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
    public class TripController : ApiController
    {
        private TripEntities db = new TripEntities();

        // using ProjectNmae.Util;
        // GET api/Trip
        public TripModel[] GetTrips()
        {
            var q = db.Trips.Select(n => new TripModel(n));

            return q.ToArray();
        }

        [ResponseType(typeof(TripModel[]))]
        [Route("~/api/Trip/GetAll/{id}")]
        [HttpGet]
        public IHttpActionResult GetAll(int id)
        {

            TripModel[] models = null;
            try
            {
                //TripDao dao = new TripDao();
                //models = dao.get$NAME&s(id);

                var q = db.Trips
                    //.Where(s => id == -1 || s.ID == id)
                    .OrderBy(s => s.TripDate)
                    .ToArray();

                models = q.Select(s => new TripModel(s))
                    .ToArray();

            }
            catch (Exception e)
            {
                return BadRequest(Util.dbErrorMessage("Can't get a new Trip(s)", e));
            }

            return Ok(models);
        }

        // GET api/Trip/5
        [ResponseType(typeof(TripModel))]
        public IHttpActionResult GetTrip(int id)
        {
            TripModel model = new TripModel();

            try
            {
                Trip trip = db.Trips.Find(id);
                if (trip == null)
                {
                    return NotFound();
                }
                model.updateModel(trip);
            }
            catch (Exception e)
            {
                return BadRequest(Util.dbErrorMessage("Can't add a new Trip", e));
            }

            return Ok(model);
        }

        // PUT api/Note/5
        [ResponseType(typeof(TripModel))]
        public IHttpActionResult PutTrip(int id, TripModel model)
        {
            //var t = model.tripDate.TimeOfDay;
            //DateTime d2 = model.tripDate.Subtract(t);
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //if (id != model.tripId)
            //{
            //    return BadRequest();
            //}

            try
            {
                Trip trip = db.Trips.Find(id);
                if (trip == null)
                {
                    return NotFound();
                }
                model.updateEntity(trip);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return BadRequest(Util.dbErrorMessage("Can't save Trip", e));
            }

            return CreatedAtRoute("DefaultApi", new { id = model.tripId }, model);
            //return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Trip
        [ResponseType(typeof(TripModel))]
        public IHttpActionResult PostTripe(TripModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Trip trip = null;

            try
            {
                trip = new Trip();
                model.updateEntity(trip);
                db.Trips.Add(trip);
                db.SaveChanges();
                model.tripId = trip.TripId;
            }
            catch (Exception e)
            {
                return BadRequest(Util.dbErrorMessage("Can't add a new Trip", e));
            }

            return CreatedAtRoute("DefaultApi", new { id = trip.TripId }, model);
        }

        // DELETE api/Trip/5
        public IHttpActionResult DeleteTrip(int id)
        {
            try
            {
                Trip trip = db.Trips.Find(id);
                if (trip == null)
                {
                    return NotFound();
                }

                db.Trips.Remove(trip);
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return BadRequest(Util.dbErrorMessage("Can't save Trip", e));
            }
            return StatusCode(HttpStatusCode.NoContent);
        }



    }
}

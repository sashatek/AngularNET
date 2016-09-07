using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularNet.Models
{
    public class TripModel
    {
        public int tripId { get; set; }
        public string groupName { get; set; }
        public int airportId { get; set; }
        public LookupItem airportId_ { get; set; }
        public int transTypeId { get; set; }
        public DateTime tripDate { get; set; }
        //public DateTime tripDate_ { get; set; }
        public int groupSize { get; set; }

        public TripModel()
        {
        }

        public TripModel(Trip trip)
        {
            updateModel(trip);
        }

        public void updateModel(Trip o)
        {
            tripId = o.TripId;
            groupName = o.GroupName;
            airportId = (int) o.AirportId;
            airportId_= new LookupItem
            {
                value = (int)o.Airport.AirportId,
                text = o.Airport.IataIdent,
                text2 = o.Airport.Name
            };
            transTypeId = o.TransTypeId;
            //tripDate = o.TripDate;
            tripDate = DateTime.SpecifyKind(o.TripDate,DateTimeKind.Local);
            tripDate = new DateTime(tripDate.Year, tripDate.Month, tripDate.Day, 0, 0, 0);  
            groupSize = o.GroupSize;
        }

        public void updateEntity(Trip d)
        {
            d.TripId = tripId;
            d.GroupName = groupName;
            d.AirportId = airportId;
            d.TransTypeId = transTypeId;
            d.TripDate = tripDate;
            //d.TripDate = DateTime.SpecifyKind(tripDate, DateTimeKind.Local);
            d.GroupSize = groupSize;
        }
    }
}
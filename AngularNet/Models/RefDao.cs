using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularNet.Models
{
    public class RefModel
    {
        public LookupItem[] transTypes { get; set; }
    }

    public class RefDao
    {
        private TripEntities db = new TripEntities();

        public RefModel getRefs()
        {
            var model = new RefModel();

            model.transTypes = (from d in db.TransTypes
                              //orderby d.IsActive, d.LocationDesc
                              select new LookupItem()
                              {
                                  value = d.TransTypeId,
                                  text = d.Description
                              }).ToArray();

            // From enum
            //
            //model.controlTypes = (Enum.GetValues(typeof(YourEnumType)).Cast<YourEnumType>()
            //        .Select(c => new LookupItem()
            //        {
            //            value = (int)c,
            //            text = c.ToString()
            //        }))
            //        .ToArray();

            return model;
        }

    }
}
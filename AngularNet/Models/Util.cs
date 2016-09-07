using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularNet.Models
{
    public class Util
    {
        public static string dbErrorMessage(string text, Exception e)
        {
            bool showErrors = true;
            string errMessage = text;
            if (showErrors)
            {
                errMessage += "\n or " + e.Message;
                if (e.InnerException != null)
                {
                    errMessage += " and " + e.InnerException.Message;
                    if (e.InnerException.InnerException != null)
                    {
                        errMessage += " and " + e.InnerException.InnerException;
                    }
                }

            }
            return errMessage;
        }

    }
}
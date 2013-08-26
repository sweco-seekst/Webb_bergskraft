using bergisService.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bergisService.Models
{
    public class DateService
    {
        public IEnumerable<string> GetAllDates()
        {
            DateHelper helper = new DateHelper();
            return helper.GetAllDates();
        }
    }
}
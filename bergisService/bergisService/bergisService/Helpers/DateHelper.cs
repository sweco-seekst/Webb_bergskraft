using bergisService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bergisService.Helpers
{
    public class DateHelper
    {
        public IEnumerable<string> GetAllDates()
        {
            List<string> dateList = new List<string>();
            List<string> tempList = new List<string>();
            dateList.Add("Failed");
            using (ReportEntities context = new ReportEntities())
            {
                tempList = context.ReportProblem.Select(d => d.date).ToList();
                
            }
            if (tempList.Count != 0)
            {
                dateList = new List<string>();
                foreach (var s in tempList)
                {
                    if (!dateList.Contains(s))
                    {
                        dateList.Add(s);
                    }
                }
            }

            
            return dateList;
        }
    }
}
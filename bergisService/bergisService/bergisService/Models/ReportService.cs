using bergisService.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bergisService.Models
{
    public class ReportService
    {
        public IEnumerable<ReportProblem> GetAllEntries()
        {
            ReportHelper helper = new ReportHelper();
            return helper.GetAllEntries();
        }

        public IEnumerable<ReportProblem> GetEntriesByDate(string id)
        {
            ReportHelper helper = new ReportHelper();
            return helper.GetEntriesByDate(id);
        }
    }
}
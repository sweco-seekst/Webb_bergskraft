using bergisService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bergisService.Helpers
{
    public class SearchHelper
    {
        public IEnumerable<ReportProblem> GetSearchResult(string id)
        {
            List<ReportProblem> entryList = new List<ReportProblem>();
            using (ReportEntities context = new ReportEntities())
            {
                entryList = context.ReportProblem.Where(d => d.date.Contains(id) || d.comment.Contains(id) || d.objectInfo.Contains(id)).Select(d => d).ToList();

            }
            if (entryList.Count != 0)
            {
                //send fail message
            }


            return entryList;
        }
    }
}
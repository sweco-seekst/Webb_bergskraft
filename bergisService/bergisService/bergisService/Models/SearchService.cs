using bergisService.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bergisService.Models
{
    public class SearchService
    {
        public IEnumerable<ReportProblem> GetSearchResult(string id)
        {
            SearchHelper helper = new SearchHelper();
            return helper.GetSearchResult(id);
        }
    }
}
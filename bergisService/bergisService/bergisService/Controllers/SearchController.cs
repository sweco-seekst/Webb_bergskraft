using bergisService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace bergisService.Controllers
{
    public class SearchController : ApiController
    {
        // GET api/search
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/search/5
        public IEnumerable<ReportProblem> Get(string id)
        {
            SearchService service = new SearchService();
            return service.GetSearchResult(id);
        }

        // POST api/search
        public void Post([FromBody]string value)
        {
        }

        // PUT api/search/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/search/5
        public void Delete(int id)
        {
        }
    }
}

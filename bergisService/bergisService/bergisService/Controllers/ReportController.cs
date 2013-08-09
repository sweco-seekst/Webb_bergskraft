using bergisService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace bergisService.Controllers
{
    public class ReportController : ApiController
    {
        // GET api/report
        public IEnumerable<ReportProblem> Get()
        {
            ReportService service = new ReportService();
            return service.GetAllEntries();
        }

        // GET api/report/5
        public IEnumerable<ReportProblem> Get(string id)
        {
            ReportService service = new ReportService();
            return service.GetEntriesByDate(id);
        }

        // POST api/report
        public void Post([FromBody]string value)
        {
        }

        // PUT api/report/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/report/5
        public void Delete(int id)
        {
        }
    }
}

using bergisService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace bergisService.Helpers
{
    public class PostHelper
    {
        public string Post(string comment, string objectInfo, string date)
        {
            var result = "failed";

            using (ReportEntities context = new ReportEntities())
            {
                ReportProblem report = new ReportProblem();
                report.comment = comment;
                report.objectInfo = objectInfo;
                report.date = date;
                context.ReportProblem.Add(report);

                if (context.SaveChanges() == 1)
                {
                    result = "success";
                }
            }

            return result;
        }

        public string ChangeStatus(int id)
        {
            var result = "failed";

            using (ReportEntities context = new ReportEntities())
            {
                context.ReportProblem.Where(d => d.C_id == id).Select(s => s).FirstOrDefault().status = 1;
                if (context.SaveChanges() == 1)
                {
                    result = "success";
                }
            }

            return result;
        }

    }
}
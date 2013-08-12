using bergisService.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace bergisService.Helpers
{
    public class ReportHelper
    {

        public IEnumerable<ReportProblem> GetAllEntries() 
        {
            List<ReportProblem> entryList = new List<ReportProblem>();
            using (ReportEntities context = new ReportEntities())
            {
                entryList = context.ReportProblem.Where(s => s.status == 0).Select(d => d).ToList();

            }
            if (entryList.Count != 0)
            {
                //send fail message
            }
            foreach (var obj in entryList)
            {
                if (obj.objectInfo.StartsWith("http"))
                {
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(obj.objectInfo);

                    HttpWebResponse response = (HttpWebResponse)request.GetResponse();

                    Stream resStream = response.GetResponseStream();
                    StreamReader reader = new StreamReader(resStream);

                    obj.objectInfo = reader.ReadToEnd();


                }
                else
                {
                    JObject jsonObject = JObject.Parse(obj.objectInfo);
                    //<style type='text/css'>table.featureInfo, table.featureInfo td, table.featureInfo th {border:1px solid #ddd;border-collapse:collapse;margin:0;padding:0;font-size: 90%;padding:.2em .1em;}table.featureInfo th {padding:.2em .2em;font-weight:bold;background:#eee;}table.featureInfo td{background:#fff;}table.featureInfo tr.odd td{background:#eee;}table.featureInfo caption{text-align:left;font-size:100%;font-weight:bold;text-transform:uppercase;padding:.2em .2em;}


                    obj.objectInfo = "<ul style='list-style-type:none;'>"
                        + "<li><b>Titel:</b>" + (string)jsonObject["MainTitle"] + "<br>"
                        + "<li><b>Företag:</b>" + (string)jsonObject["Company"] + "<br>"
                        + "<li><b>Enhet:</b>" + (string)jsonObject["Deposits"][0]["DepositName"] + "<br>"
                        + "<li><b>SGU-Nordlig:</b>" + (string)jsonObject["Deposits"][0]["SGU_North"] + "<br>"
                        + "<li><b>SGU-Östlig:</b>" + (string)jsonObject["Deposits"][0]["SGU_East"] + "<br>"
                        + "<li><b>Sweref-Nordlig:</b>" + (string)jsonObject["Deposits"][0]["Sweref_North"] + "<br>"
                        + "<li><b>Sweref-Östlig:</b>" + (string)jsonObject["Deposits"][0]["Sweref_East"] + "<br>"
                        + "<li><b>Kommun:</b>" + (string)jsonObject["Deposits"][0]["AdministrativeUnit"][0]["Municipality"] + "<br>"
                        + "<li><b>Län:</b>" + (string)jsonObject["Deposits"][0]["AdministrativeUnit"][0]["County"] + "</ul>";



                }
            }

            return entryList;
        }

        public IEnumerable<ReportProblem> GetEntriesByDate(string id)
        {
            List<ReportProblem> entryList = new List<ReportProblem>();
            using (ReportEntities context = new ReportEntities())
            {
                entryList = context.ReportProblem.Where(d => d.date == id).Where(s => s.status == 0).Select(d => d).ToList();

            }
            if (entryList.Count != 0)
            {
                //send fail message
            }
            foreach (var obj in entryList)
            {
                if (obj.objectInfo.StartsWith("http"))
                {
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(obj.objectInfo);

                    HttpWebResponse response = (HttpWebResponse)request.GetResponse();

                    Stream resStream = response.GetResponseStream();
                    StreamReader reader = new StreamReader(resStream);

                    obj.objectInfo = reader.ReadToEnd();


                }
                else
                {
                    JObject jsonObject = JObject.Parse(obj.objectInfo);
                    //<style type='text/css'>table.featureInfo, table.featureInfo td, table.featureInfo th {border:1px solid #ddd;border-collapse:collapse;margin:0;padding:0;font-size: 90%;padding:.2em .1em;}table.featureInfo th {padding:.2em .2em;font-weight:bold;background:#eee;}table.featureInfo td{background:#fff;}table.featureInfo tr.odd td{background:#eee;}table.featureInfo caption{text-align:left;font-size:100%;font-weight:bold;text-transform:uppercase;padding:.2em .2em;}


                    obj.objectInfo = "<ul style='list-style-type:none;'>"
                        + "<li><b>Titel:</b>" + (string)jsonObject["MainTitle"] + "<br>"
                        + "<li><b>Företag:</b>" + (string)jsonObject["Company"] + "<br>"
                        + "<li><b>Enhet:</b>" + (string)jsonObject["Deposits"][0]["DepositName"] + "<br>"
                        + "<li><b>SGU-Nordlig:</b>" + (string)jsonObject["Deposits"][0]["SGU_North"] + "<br>"
                        + "<li><b>SGU-Östlig:</b>" + (string)jsonObject["Deposits"][0]["SGU_East"] + "<br>"
                        + "<li><b>Sweref-Nordlig:</b>" + (string)jsonObject["Deposits"][0]["Sweref_North"] + "<br>"
                        + "<li><b>Sweref-Östlig:</b>" + (string)jsonObject["Deposits"][0]["Sweref_East"] + "<br>"
                        + "<li><b>Kommun:</b>" + (string)jsonObject["Deposits"][0]["AdministrativeUnit"][0]["Municipality"] + "<br>"
                        + "<li><b>Län:</b>" + (string)jsonObject["Deposits"][0]["AdministrativeUnit"][0]["County"] + "</ul>";



                }
            }

            return entryList;
        }
    }
}
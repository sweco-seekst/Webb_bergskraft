using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Common;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using BerGisDal;
using System.Xml;
using System.Xml.Serialization;
using System.Xml.Linq;
using System.Drawing;

public partial class getCount : System.Web.UI.Page
{
    protected void Page_PreInit(object sender, EventArgs e)
    {
        Theme = "";
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string sWord = Request.QueryString["sWord"];
        string sColumn = Request.QueryString["sColumn"];
        string sCriterias = Request.QueryString["filter"];
        string includeNoData = Request.QueryString["includeNoData"];
        includeNoData = "false";
        List<string> arrCriterias = new List<string>();
        if (!string.IsNullOrEmpty(sCriterias))
        {
            arrCriterias = sCriterias.Split(';').ToList();
        }
        foreach (string ac in arrCriterias)
        {
          //ac.Substring(ac.IndexOf(' '),ac.Length);
          sWord += " " + ac;
        }
        IQueryable<SearchIndexAdm_SearchFreeTextMultipleResult> query = searchHelper.Search(bool.Parse(includeNoData), sColumn, arrCriterias, sWord);

        int count = query.Count();

        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetExpires(DateTime.Now.AddDays(-1));
        Response.Write(count);
        Response.End();
    }
}

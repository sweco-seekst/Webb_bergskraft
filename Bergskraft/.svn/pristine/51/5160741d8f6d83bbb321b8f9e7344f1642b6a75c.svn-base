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

public partial class post : System.Web.UI.Page
{
	protected override void OnPreInit(EventArgs e) {
		Page.Theme = "";
	}
    
    protected void Page_Load(object sender, EventArgs e)
    {
        string sWord = Request.QueryString["sWord"];
        string sColumn = Request.QueryString["sColumn"];
        string sCriterias = Request.QueryString["filter"];
        string includeNoData = Request.QueryString["includeNoData"];
        includeNoData = "false";
        int pageNo = int.Parse(Request.QueryString["pageNo"]);
        int pageLenth = 10;
        int startIndex = (pageNo - 1) * pageLenth;

        List<string> arrCriterias = new List<string>();
        if (!string.IsNullOrEmpty(sCriterias))
        {
            arrCriterias = sCriterias.Split(';').ToList();
        }
        foreach (string ac in arrCriterias)
        {
            sWord += " " + ac;
        }

        var query = searchHelper.Search(bool.Parse(includeNoData), sColumn, arrCriterias, sWord).ToList();
        
        //IQueryable<SearchIndexAdm_SearchFreeTextMultipleResult> query = searchHelper.Search(bool.Parse(includeNoData), sColumn, arrCriterias, sWord);
        int count = query.Count();

        IEnumerable<SearchIndexAdm_SearchFreeTextMultipleResult> searchIndex = query.Skip(startIndex).Take(10);

        XElement elm = new XElement("searchTexts");
        elm.Add(new XElement("count", count));
        XElement elmPages = new XElement("pages");

        foreach (SearchIndexAdm_SearchFreeTextMultipleResult si in searchIndex)
        {
            XElement xelm = new XElement("searchText");
            xelm.Add(new XAttribute("MainTitel", isStringNull(si.MainTitel)));
            xelm.Add(new XAttribute("Author", isStringNull(si.Author)));
            xelm.Add(new XAttribute("PageNo", si.PageNo));
            xelm.Add(new XAttribute("NoOfPages", si.NoOfPages));
            xelm.Add(new XAttribute("County", isStringNull(si.County)));
            xelm.Add(new XAttribute("Municipality", isStringNull(si.Municipality)));
            xelm.Add(new XAttribute("PageId", si.PageId));
            xelm.Add(new XAttribute("DocumentId", si.DocumentId));
            elm.Add(xelm);
            elmPages.Add(new XElement("page",
                new XAttribute("pageId", si.PageId)));
        }
        elm.Add(elmPages);

        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetExpires(DateTime.Now.AddDays(-1));
        
        Response.Write(elm);
        Response.End();
    }
    protected string isStringNull(string value)
    {
        string returnValue;
        if (value != null)
        {
            returnValue = value;
        }
        else
        {
            returnValue = "";
        }
        return returnValue;
    }
    protected int isIntNull(int value)
    {
        int returnValue;
        if (value != null)
        {
            returnValue = value;
        }
        else
        {
            returnValue = 0;
        }
        return returnValue;
    }
}
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

public partial class getDocuments : System.Web.UI.Page {
    protected void Page_PreInit(object sender, EventArgs e) {
        Theme = "";
    }

    protected void Page_Load(object sender, EventArgs e) {
        string imgPath = ConfigurationManager.AppSettings["pageImgPath"];
        int pageId;
        int pageCount = 0;
        bool success = int.TryParse(Request.QueryString["pageId"], out pageId);
        BerGisDalDataContext ctx = LinqHelper.GetDataContext();
        
        var docId = (from doc in ctx.SearchIndexAdms
                    where doc.PageId.Equals(pageId)
                    select doc.DocumentId).Single();

        var pageCollection = (from p in ctx.Pages
                             where p.DocumentId.Equals(docId)
                             orderby p.PageNo
                             group p by p.ImagePath into images
                             select images);


        XElement elmPages = new XElement("Pages");
        
        foreach (var pageSet in pageCollection)
        {
            try
            {
                var p = pageSet.First();
                    XElement elmPage =
                       new XElement("Page",
                           (new XElement("pageId", p.PageId)),
                            (new XElement("imgPath", imgPath + p.ImagePath)),
                            //TODO DEBE
                           //(new XElement("imgPath", "services/documentProxy.aspx?image=" + p.ImagePath)),
                           //(new XElement("width", sz.Width)),
                           //(new XElement("height", sz.Height)),
                           (new XElement("pageNo", p.PageNo)));
                    elmPages.Add(elmPage);
                    pageCount++;
                }
            //}
            catch (System.IO.FileNotFoundException ex)
            {
            }
        }
        XElement count = new XElement("Count", pageCount);
        elmPages.Add(count);

        Response.Write(elmPages);
        Response.End();
    }
}

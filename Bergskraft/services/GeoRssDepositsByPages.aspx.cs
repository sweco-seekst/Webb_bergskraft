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
using MightyLittleGeodesy.Positions;
using System.Globalization;

public partial class GeoRssDepositsByPages : System.Web.UI.Page {

	protected override void OnPreInit(EventArgs e) {
		Page.Theme = "";
	}

	protected void Page_Load(object sender, EventArgs e) {
		string pagesString = Request.QueryString["pages"]; // integers separated with ;

        BerGisDalDataContext ctx = LinqHelper.GetDataContext();
        IEnumerable<Deposit_GetByPageIdsResult> deposits = ctx.Deposit_GetByPageIds(pagesString);

		StringBuilder xmlResponse = new StringBuilder();
		xmlResponse.AppendLine("<?xml version='1.0' encoding='UTF-8'?>");
		xmlResponse.AppendLine("<rdf:RDF  xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'");
		xmlResponse.AppendLine("xmlns='http://purl.org/rss/1.0/'");
		xmlResponse.AppendLine("xmlns:dc='http://purl.org/dc/elements/1.1/'");
		xmlResponse.AppendLine("xmlns:georss='http://www.georss.org/georss'>");

        


		XElement elm = new XElement("Coordinates");
        foreach (Deposit_GetByPageIdsResult d in deposits)
        {
            var pageId = (from pd in ctx.PageDeposits
                          where pd.DepositId == d.DepositId
                          select pd.PageId).FirstOrDefault();
          var wgsPos = transformRT90Coords(Convert.ToDouble(d.BK_North), Convert.ToDouble(d.BK_East));
       var lat = wgsPos.Latitude.ToString(CultureInfo.GetCultureInfo("en-US"));
       var lon = wgsPos.Longitude.ToString(CultureInfo.GetCultureInfo("en-US"));
			if (d.BK_East != null && d.BK_North != null) {
				xmlResponse.AppendLine("<item rdf:about=''>");
                xmlResponse.AppendLine("<link>" + pageId + "</link>");
				xmlResponse.AppendLine("<title>" + d.Name + "</title>");
				xmlResponse.AppendLine("<description><![CDATA[");
                var workPlaceNames = from de in ctx.Workplaces
                         where de.DepositId == d.DepositId
                         select de.Name;
                foreach (string w in workPlaceNames)
                {
					xmlResponse.AppendLine(w + "<br/>");
				}
				xmlResponse.AppendLine("]]></description>");
        xmlResponse.AppendLine("<georss:point>" + lat + ", " + lon + "</georss:point>");
				xmlResponse.AppendLine("</item>");
			}
            else if (d.SGU_East != null && d.SGU_North != null)
            {
                var wgsPos2 = transformRT90Coords(Convert.ToDouble(d.SGU_North), Convert.ToDouble(d.SGU_East));
                var lat2 = wgsPos2.Latitude.ToString(CultureInfo.GetCultureInfo("en-US"));
                var lon2 = wgsPos2.Longitude.ToString(CultureInfo.GetCultureInfo("en-US"));
                xmlResponse.AppendLine("<item rdf:about=''>");
                xmlResponse.AppendLine("<link>" + pageId + "</link>");
                xmlResponse.AppendLine("<title>" + d.Name + "</title>");
                xmlResponse.AppendLine("<description><![CDATA[");
                var workPlaceNames = from de in ctx.Workplaces
                                     where de.DepositId == d.DepositId
                                     select de.Name;
                foreach (string w in workPlaceNames)
                {
                    xmlResponse.AppendLine(w + "<br/>");
                }
                xmlResponse.AppendLine("]]></description>");
                xmlResponse.AppendLine("<georss:point>" + lat2 + ", " + lon2 + "</georss:point>");
                xmlResponse.AppendLine("</item>");
            }
      else if (d.Sweref_East != null && d.Sweref_North != null)
      {
        var wgsPos3 = transformSweRefCoords(Convert.ToDouble(d.Sweref_North), Convert.ToDouble(d.Sweref_East));

        xmlResponse.AppendLine("<item rdf:about=''>");
        xmlResponse.AppendLine("<link>" + pageId + "</link>");
        xmlResponse.AppendLine("<title>" + d.Name + "</title>");
        xmlResponse.AppendLine("<description><![CDATA[");
        var workPlaces = from wp in ctx.Workplaces
                         where wp.DepositId == d.DepositId
                         select wp.Name;

        foreach (string w in workPlaces)
        {
          xmlResponse.AppendLine(w + "<br/>");
        }
        xmlResponse.AppendLine("]]></description>");
        xmlResponse.AppendLine("<georss:point>" + wgsPos3.Latitude.ToString(CultureInfo.GetCultureInfo("en-US")) + ", " + wgsPos3.Longitude.ToString(CultureInfo.GetCultureInfo("en-US")) + "</georss:point>");
        xmlResponse.AppendLine("</item>");
      }
		}
		xmlResponse.AppendLine("</rdf:RDF>");

		Response.Write(xmlResponse.ToString());
		Response.End();
	}
  private WGS84Position transformRT90Coords(double sguNorth, double sguEast)
  {
    RT90Position rt90Pos = new RT90Position(sguNorth, sguEast);
    SWEREF99Position sweRef = new SWEREF99Position(rt90Pos.ToWGS84(), SWEREF99Position.SWEREFProjection.sweref_99_tm);

    WGS84Position wgsPos = sweRef.ToWGS84();
    return wgsPos;
  }

  private WGS84Position transformSweRefCoords(double Sweref_north, double Sweref_east)
  {
    SWEREF99Position swePos = new SWEREF99Position(Sweref_north, Sweref_east);
    WGS84Position wgsPos = swePos.ToWGS84();
    return wgsPos;
  }


}
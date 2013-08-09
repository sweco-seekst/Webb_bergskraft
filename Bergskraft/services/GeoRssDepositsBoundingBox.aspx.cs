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

public partial class GeoRssDepositsBoundingBox : System.Web.UI.Page
{
	protected override void OnPreInit(EventArgs e) {
		Page.Theme = "";
	}

	protected void Page_Load(object sender, EventArgs e) {
		string pagesString = Request.QueryString["pages"]; // integers separated with ;

        BerGisDalDataContext ctx = LinqHelper.GetDataContext();
        IEnumerable<Deposit_GetByPageIdsResult> deposits = ctx.Deposit_GetByPageIds(pagesString);
        double xMin = 9999999999;
        double yMin = 9999999999;
        double xMax = 0;
        double yMax = 0;
        foreach (Deposit_GetByPageIdsResult d in deposits)
        {
			if (d.BK_East != null && d.BK_North != null) {
        var wgsPos = transformRT90Coords(Convert.ToDouble(d.BK_North), Convert.ToDouble(d.BK_East));

        if (xMin > wgsPos.Latitude) xMin = Double.Parse(wgsPos.Latitude.ToString());
        if (yMin > wgsPos.Longitude) yMin = Double.Parse(wgsPos.Longitude.ToString());
                if (xMax < wgsPos.Latitude) xMax = Double.Parse(wgsPos.Latitude.ToString());
                if (yMax < wgsPos.Longitude) yMax = Double.Parse(wgsPos.Longitude.ToString());
			}
            else if (d.SGU_East != null && d.SGU_North != null)
            {
              var wgsPos2 = transformRT90Coords(Convert.ToDouble(d.SGU_North), Convert.ToDouble(d.SGU_East));
              if (xMin > wgsPos2.Latitude) xMin = Double.Parse(wgsPos2.Latitude.ToString());
              if (yMin > wgsPos2.Longitude) yMin = Double.Parse(wgsPos2.Longitude.ToString());
                if (xMax < wgsPos2.Latitude) xMax = Double.Parse(wgsPos2.Latitude.ToString());
                if (yMax < wgsPos2.Longitude) yMax = Double.Parse(wgsPos2.Longitude.ToString());
            }
      else if (d.Sweref_East != null && d.Sweref_North != null)
      {
        var wgsPos3 = transformSweRefCoords(Convert.ToDouble(d.SGU_North), Convert.ToDouble(d.SGU_East));
        if (xMin > wgsPos3.Latitude) xMin = Double.Parse(wgsPos3.Latitude.ToString());
        if (yMin > wgsPos3.Longitude) yMin = Double.Parse(wgsPos3.Longitude.ToString());
        if (xMax < wgsPos3.Latitude) xMax = Double.Parse(wgsPos3.Latitude.ToString());
        if (yMax < wgsPos3.Longitude) yMax = Double.Parse(wgsPos3.Longitude.ToString());
      }
		}
    //här skicka bbox med wgs84
    string bBox = xMin.ToString(CultureInfo.GetCultureInfo("en-US")) + "&" + yMin.ToString(CultureInfo.GetCultureInfo("en-US")) + "&" + xMax.ToString(CultureInfo.GetCultureInfo("en-US")) + "&" + yMax.ToString(CultureInfo.GetCultureInfo("en-US"));
		Response.Write(bBox);
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
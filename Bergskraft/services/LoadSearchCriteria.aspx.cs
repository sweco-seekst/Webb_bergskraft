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

public partial class LoadSearchCriteria : System.Web.UI.Page
{
    protected override void OnPreInit(EventArgs e)
    {
        Page.Theme = "";
    }

    protected void Page_Load(object sender, EventArgs e)
    {

        BerGisDalDataContext ctx = LinqHelper.GetDataContext();

        List<string> counties = (from adm in ctx.AdministrativeUnits
                                 select adm.County).Distinct().ToList();
        counties.Sort();

        XElement elm = new XElement("Criteria");
        XElement countysElm = new XElement("Countys");
        //XElement miningFieldsElm = new XElement("Miningfields");

        foreach (string county in counties)
        {
            if (county != null) 
            {
                XElement countyElm = new XElement("County",
                    new XAttribute("Name", county));
                List<string> municipalities = (from adm in ctx.AdministrativeUnits
                                      where adm.County == county
                                      select adm.Municipality).Distinct().ToList();
                municipalities.Sort();

                foreach (string mun in municipalities)
                {
                    if (mun != null) {
                        XElement municipalityElm = new XElement("Municipality",
                            new XAttribute("Name", mun));
                        List<string> shires = (from adm in ctx.AdministrativeUnits
                                     where adm.Municipality == mun
                                     select adm.Shire).Distinct().ToList();
                        shires.Sort();

                        foreach (string shire in shires)
                        {
                            if (shire != null)
                            {
                                municipalityElm.Add(new XElement("Shire",
                                new XAttribute("Name", shire)));
                            }
                        }
                        countyElm.Add(municipalityElm);
                    }
                }
                countysElm.Add(countyElm);
            }
        }
        #region MiningFields (not in use)
        //foreach (string miningfield in miningfields)
        //{
        //    if (miningfield != null) 
        //    {
        //        XElement miningFieldElm = new XElement("Miningfield",
        //            new XAttribute("Name", miningfield));

        //        var miningId = (from id in ctx.MiningFields
        //                        where id.Name == miningfield
        //                        select id.MiningFieldId).Distinct();

        //        foreach (int id in miningId)
        //        {
        //                var deposits = (from dep in ctx.Deposits
        //                                where dep.MiningFieldId == id
        //                                select dep.Name).Distinct();
        //                foreach (string deposit in deposits)
        //                {
        //                    if (deposit != null) 
        //                    {
        //                        miningFieldElm.Add(new XElement("Deposit",
        //                            new XAttribute("Name", deposit)));
        //                    }
        //                }
        //                miningFieldsElm.Add(miningFieldElm);
        //        }

        //    }
        //}
        #endregion
       
        elm.Add(countysElm);
        //elm.Add(miningFieldsElm);
        Response.Write(elm);
        Response.End();
    }
}

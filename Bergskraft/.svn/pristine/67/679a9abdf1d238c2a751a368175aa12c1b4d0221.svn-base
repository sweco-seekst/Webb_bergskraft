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

public partial class postObject : System.Web.UI.Page
{
    protected void Page_PreInit(object sender, EventArgs e) {
        Theme = "";
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        int pageId;
        bool success = int.TryParse(Request.QueryString["pageId"], out pageId);

        BerGisDalDataContext ctx = LinqHelper.GetDataContext();
        IEnumerable<Document_GetByPageIdResult> enumDocument = ctx.Document_GetByPageId(pageId);
        IEnumerable<Deposit_GetByPageIdsResult> enumDeposits = ctx.Deposit_GetByPageIds(pageId.ToString());


        //DEBE TODO Fixa chapter
        //var chapterId = from p in ctx.Pages
        //                where p.PageId == pageId
        //                select p.ChapterId;
        //string chapterName = "";
        //if (chapterId.Single() != null)
        //{
        //    var chapStr = from c in ctx.Chapters
        //                  where c.ChapterId == chapterId.Single()
        //                  select c.Name.ToString();
        //    chapterName = chapStr.Single().ToString();
        //}
        var mineIDs = from p in ctx.PageMiningFields
                      where p.PageId == pageId
                      select p.MiningFieldId;

        IEnumerable<MiningField> mineObject = from p in ctx.MiningFields
                      where mineIDs.Contains(p.MiningFieldId)
                      select p;
        //var WorkPlaces = ctx.GetWorkPlace(pageId);
        XElement elmObjects = new XElement("Objects");        
        XElement elmDeposits = new XElement("Deposits");
        foreach (Document_GetByPageIdResult doc in enumDocument)
        {
            XElement elmSingleObject = 
            new XElement("Object", 
            (new XElement("MainTitle", doc.MainTitel)),
            (new XElement("Initiator", doc.Initiator)),
            (new XElement("PageId", pageId)),
            (new XElement("Chapter", doc.SubTitel)),
            (new XElement("Author", doc.Authour)),
            (new XElement("Company", doc.Company)),
            (new XElement("ReportId", doc.ReportId)),
            (new XElement("PublishDate", doc.PublishDate)));
            List<int> listOfMineId = new List<int>();
            List<int> listOfDepMineId = new List<int>();
            foreach (Deposit_GetByPageIdsResult dep in enumDeposits)
            {
                string currentMine = "";
                XElement elmSingleDeposit = new XElement("Deposit",
                    (new XElement("DepositName", dep.Name)),
                    (new XElement("MiningField", currentMine)),
                    (new XElement("BK_North", dep.BK_North)),
                    (new XElement("BK_East", dep.BK_East)),
                    (new XElement("SGU_North", dep.SGU_North)),
                    (new XElement("SGU_East", dep.SGU_East)),
                    (new XElement("Sweref_North", dep.Sweref_North)),
                    (new XElement("Sweref_East", dep.Sweref_East))
                    );
                var admUnit = from au in ctx.AdministrativeUnits
                              where au.DepositId == dep.DepositId
                              select au;
                foreach (AdministrativeUnit adm in admUnit)
                {
                    XElement elmSingleAdm = new XElement("Administrative",
                        (new XElement("County", adm.County)),
                        (new XElement("Municipality", adm.Municipality)),
                        (new XElement("Shire", adm.Shire)),
                        (new XElement("Farm", adm.Farm))
                        );
                    elmSingleDeposit.Add(elmSingleAdm);    
                }
                //DEBE TODO 
                //foreach (var wp in WorkPlaces)
                //{
                //    if (dep.DepositId == wp.DepositId)
                //    {
                //        XElement elmWorkPlace = new XElement("WorkPlace");

                //        elmWorkPlace.Add(new XElement("WorkplaceName", wp.Name));

                //        elmWorkPlace.Add(new XElement("LocalX", wp.LocalX));

                //        elmWorkPlace.Add(new XElement("LocalY", wp.LocalY));

                //        elmWorkPlace.Add(new XElement("LocalZ", wp.LocalZ));

                //        elmSingleDeposit.Add(elmWorkPlace);
                //    }
                //}
                elmSingleObject.Add(elmSingleDeposit);
            }
            getMissingMineFields MiningFieldsMissingMine = new getMissingMineFields();
            List<string> mineFields = MiningFieldsMissingMine.getMineFields(pageId);
            foreach (string mf in mineFields)
            {
                XElement elmMineField = new XElement("UCminingFields", mf.ToString());
                elmSingleObject.Add(elmMineField);
            }
            elmObjects.Add(elmSingleObject);
        }
        Response.Write(elmObjects.ToString());
        Response.End();
    }
}

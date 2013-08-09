using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using BerGisDal;

/// <summary>
/// Summary description for getMissingMineFields
/// </summary>
public class getMissingMineFields
{
    public List<string> getMineFields(int pageId)
    {
        BerGisDalDataContext ctx = LinqHelper.GetDataContext();

        //var miningFields = ctx.GetMiningFields(pageId);
        List<string> listOfMF = new List<string>();
        //foreach (var mine in miningFields)
        //{
        //    listOfMF.Add(mine.Name);
        //}
        return listOfMF;
    }
}


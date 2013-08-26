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

/// <summary>
/// Summary description for searchHelper
/// </summary>
public static class searchHelper
{
    public static IQueryable<SearchIndexAdm_SearchFreeTextMultipleResult> Search(bool includeNoData, string searchColumn, List<string> searchCriteria, string searchText)
    {
        
        BerGisDalDataContext ctx = LinqHelper.GetDataContext();
        var predicate = predicateBuilder.False<SearchIndexAdm_SearchFreeTextMultipleResult>();
        IQueryable<SearchIndexAdm_SearchFreeTextMultipleResult> query = ctx.SearchIndexAdm_SearchFreeTextMultiple(searchText).AsQueryable();

       // var query = ctx.SearchIndex_SearchFreeTextMultiple(searchText).AsQueryable();
        // Get all records first
        //var query = from s in ctx.SearchIndexes
        //            select s;
        //////// Filter the result by searchText, if not null
        //if (!string.IsNullOrEmpty(searchText))
        //{
        //    query = from x in query
        //            where x.SearchText.Contains(searchText)
        //            select x;
        //}

        // Filter the result by the selected criterias in the specified column.
        //if (searchCriteria.Count > 0)
        //{
        //    switch (searchColumn)
        //    {
        //        case "Shire":
        //            foreach (string criteria in searchCriteria)
        //            {
        //                string crit = criteria;
        //                predicate = predicate.Or(c => c.Shire.Contains(crit));
        //            }
        //            if (includeNoData)
        //            {
        //                predicate = predicate.Or(c => c.Shire.Equals(null));
        //            }
        //            break;
        //        case "Municipality":
        //            foreach (string criteria in searchCriteria)
        //            {
        //                string crit = criteria;
        //                predicate = predicate.Or(c => c.Municipality.Contains(crit));
        //            }
        //            if (includeNoData)
        //            {
        //                predicate = predicate.Or(c => c.Municipality.Equals(null));
        //            }
        //            break;
        //        case "County":
        //            foreach (string criteria in searchCriteria)
        //            {
        //                string crit = criteria;
        //                predicate = predicate.Or(c => c.County.Contains(crit));
        //            }
        //            if (includeNoData)
        //            {
        //                predicate = predicate.Or(c => c.County.Equals(null));
        //            }
        //            break;
        //        default:
        //            break;
        //    }
        //    query = from x in query.Where(predicate)
        //            select x;
        //}
        query = from x in query
                orderby
                    x.MainTitel, x.PageNo
                select x;
        return query;
    }
}

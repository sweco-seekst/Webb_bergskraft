using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Security;
using BerGisDal;
using System.Linq;
using System.Configuration;

/// <summary>
/// Summary description for count
/// </summary>
public class imageCount
{
    public imageCount()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    public void incPageCount()
    {
        MembershipUser usr = Membership.GetUser();
        Guid uID = (Guid)usr.ProviderUserKey;
        string userId = uID.ToString();
        BerGisDalDataContext ctx = LinqHelper.GetDataContext();

        var user = (from u in ctx.UserDatas
                    where u.UserId.Equals(userId)
                    select u).Single();
        user.ImageCount++;
        ctx.SubmitChanges();
    }
}

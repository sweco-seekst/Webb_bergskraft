using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Security;
using BerGisDal;
using System.Linq;

/// <summary>
/// Summary description for saveUserBillingInfo
/// </summary>
public class saveUserBillingInfo
{
    public bool save(userInformation userInfo)
    {
        try
        {
            MembershipUser usr = Membership.GetUser();
            Guid uID = (Guid)usr.ProviderUserKey;
            string userId = uID.ToString();
            BerGisDalDataContext ctx = LinqHelper.GetDataContext();

            var user = (from u in ctx.UserDatas
                        where u.UserId.Equals(userId)
                        select u).Single();

            user.FirstName = userInfo.FirstName;
            user.LastName = userInfo.LastName;
            //user.PersonalNumber = userInfo.PersonalNumber;
            user.Address = userInfo.Adress;
            user.ZipCode = userInfo.ZipCode;
            user.PostalAddress = userInfo.PostalAdress;
            user.PhoneNumber = userInfo.PhoneNumber;
            user.CellPhone = userInfo.CellPhone;
            ctx.SubmitChanges();

            userInfo.UserId = userId;
            
            return true;
            
        }
        catch (Exception ex) {
            return false;
        }
    }
}

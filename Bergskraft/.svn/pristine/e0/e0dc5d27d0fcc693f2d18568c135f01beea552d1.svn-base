using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using BerGisDal;
using System.Linq;
using System.Configuration;
using System.Text;

/// <summary>
/// Returns information on the logged in user.
/// Returns a string separated by ;.
/// The string contains: userName, userPaidToDate(or "Expired") and freeviewsLeft
/// If no user logged in, an empty string is returned.
/// </summary>
public partial class services_getUserInfo : System.Web.UI.Page
{
    protected override void OnPreInit(EventArgs e)
    {
        Page.Theme = "";
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string returnString ="";

        // Get membership user object
        MembershipUser user = Membership.GetUser();
        // If user logged in
        if (user != null)
        {
            // Get user data
            string userName;
            userName = user.UserName;

            // Get payment status
            //string userID = user.ProviderUserKey.ToString();
            //string userPaidToDate = "";
            //BerGisDalDataContext ctx = LinqHelper.GetDataContext();
            //IQueryable<DateTime> hasPaid = from u in ctx.UserDatas
            //                               where u.UserId.Equals(userID)
            //                               select (DateTime)u.PaymentValidToDate;
            ////Get payment date
            //foreach (DateTime dt in hasPaid)
            //{
            //    int compareDate = DateTime.Now.CompareTo(dt);
            //    if (compareDate == -1)
            //    {
            //        userPaidToDate = dt.ToShortDateString() + " " + dt.ToShortTimeString();
            //    }
            //    else
            //    {
            //        userPaidToDate = "Expired";
            //    }
            //}

            //// Get freeviews left
            //int freeviewsLeft = 0;
            ////int currentImageCount = (from u in ctx.UserDatas
            ////                         where u.UserId.Equals(userID)
            ////                         select u.ImageCount).Single();
            //int currentImageCount = 0;

            //int maxCount;
            //bool maxFlag = int.TryParse(ConfigurationManager.AppSettings["maxCount"], out maxCount);
            //freeviewsLeft = maxCount - currentImageCount;

            //var userData = (from u in ctx.UserDatas
            //            where u.UserId.Equals(userID)
            //            select u).Single();

            

            // Build return string
            List<string> returnData = new List<string>();
            returnData.Add(userName);
            returnData.Add("");
            returnData.Add("9999999");
            returnData.Add("");
            returnData.Add("");
            //returnData.Add(userData.PersonalNumber);
            //returnData.Add(userData.Address);
            //returnData.Add(userData.ZipCode);
            //returnData.Add(userData.PostalAddress);
            //returnData.Add(userData.PhoneNumber);
            //returnData.Add(userData.CellPhone);
            returnString = string.Join(";", returnData.ToArray());
        }
        // If not logged in
        else
        {
            // Return empty string.
            returnString = "";
        }
           
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetExpires(DateTime.Now.AddDays(-1));
        Response.Write(returnString);
        Response.End();
    }
}

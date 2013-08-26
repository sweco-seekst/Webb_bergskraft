using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Linq;
using BerGisDal;
using System.Net.Mail;
using System.Text;

public partial class services_createUser : System.Web.UI.Page
{
    protected override void OnPreInit(EventArgs e)
    {
        Page.Theme = "";
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string userName = Request.Params["userName"];
        string password = Request.Params["password"];

        BerGisDalDataContext ctx = LinqHelper.GetDataContext();
        // Create user
        MembershipCreateStatus status = new MembershipCreateStatus();
        MembershipUser newUser = Membership.CreateUser(userName, password, userName, "What is the final answer?", "42", true, out status);
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetExpires(DateTime.Now.AddDays(-1)); 
        if (status == MembershipCreateStatus.Success)
        {
            Response.Write("success");
            CreateUserData(newUser);
            //SendConfirmationEmail(userName,newUser.ProviderUserKey.ToString());
            // Log in the user.
        }
        else
        {
            Response.Write("failed");
        }
        Response.End();
    }

    /// <summary>
    /// Create other user data for the specified User.
    /// </summary>
    /// <param name="newUser">the usero</param>
    protected void CreateUserData(MembershipUser newUser)
    {
        Guid userId = (Guid)newUser.ProviderUserKey;
        BerGisDalDataContext ctx = LinqHelper.GetDataContext();
        aspnet_User user = (from u in ctx.aspnet_Users
                                  where u.UserId == userId
                                  select u).Single();
        
        user.UserDatas.Add(new UserData
        {
            FirstName = "",
            LastName = "",
            Address = "",
            CellPhone = "",
            Country = "",
            PhoneNumber ="",
            ZipCode="",
            PostalAddress="",
            PaymentValidToDate = DateTime.Now
        });

        ctx.SubmitChanges();
    }
    private void SendConfirmationEmail(string email, string userId)
    {
        string smtpFromAdress =  ConfigurationSettings.AppSettings["smtpFromAdress"];
        string confirmationURL =  ConfigurationSettings.AppSettings["confirmationURL"];
        MailMessage message = new MailMessage(smtpFromAdress, email);
        message.Subject = "Bekräfta konto hos Bergskraft.";
        StringBuilder sb = new StringBuilder();
        sb.AppendLine("För att aktivera ditt konto hos Bergskraft så klicka på länken här nedan.");
        sb.AppendLine(confirmationURL + "?confirmationCode=" + userId);
        message.Body = sb.ToString();
        message.BodyEncoding = System.Text.Encoding.UTF8;
        SmtpClient smtpClient = new SmtpClient();
        smtpClient.Send(message);
        message.Dispose();
    }
}

using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Linq;
using BerGisDal;
using System.Web.Security;

public partial class services_ConfirmEmail : System.Web.UI.Page
{
    protected override void OnPreInit(EventArgs e)
    {
        Page.Theme = "";
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string userMessage = "";
        string confirmationCode = Request.QueryString["confirmationCode"];
        try
        {
            // Make a guid from the confirmation code
            var userConfirmationGUID = new Guid(confirmationCode);
            MembershipUser user = Membership.GetUser(userConfirmationGUID);
            // If a user exists with the specified ID, then approve it.
            if (user != null)
            {
                user.IsApproved = true;
                Membership.UpdateUser(user);
                userMessage = "<p style='font-family:verdana;border:1px solid #DDA625'>Ditt konto är nu aktiverat. Du kan nu logga in.</p>";
            }
        }
        catch (Exception ex)
        {
            userMessage = "<p style='font-family:verdana;border:1px solid #DDA625'>Ett fel uppstod, ditt konto kunde inte aktiveras.<br /> Vänligen kontakta Bergskraft.se via mail</p>";
        }
        Response.Write(userMessage);
        Response.End();
    }
}

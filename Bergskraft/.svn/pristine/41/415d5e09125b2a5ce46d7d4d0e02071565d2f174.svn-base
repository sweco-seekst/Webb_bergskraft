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


public partial class services_loginUser : System.Web.UI.Page
{
    protected override void OnPreInit(EventArgs e)
    {
        Page.Theme = "";
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string email = Request.QueryString["email"];
        string password = Request.QueryString["password"];
        bool login = Membership.ValidateUser(email, password);
        FormsAuthentication.SetAuthCookie(email, login);

        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetExpires(DateTime.Now.AddDays(-1)); 
        Response.Write("abc");
        Response.End();

    }
}

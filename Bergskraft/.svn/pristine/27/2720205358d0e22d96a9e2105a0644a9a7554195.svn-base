using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Odbc;
using System.Data;
using System.Web.Configuration;
using System.Text;
using System.Web.Security;

public partial class MapSearch : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string key = System.Configuration.ConfigurationManager.AppSettings["PaymentKey"];
        this.ClientScript.RegisterStartupScript(this.GetType(), "setPaymentKey", string.Format("var gPaymentKey = '{0}';", key), true);

        string timerKey = System.Configuration.ConfigurationManager.AppSettings["searchTimer"];
        this.ClientScript.RegisterStartupScript(this.GetType(), "setSearchTimer", string.Format("var searchTimer = '{0}';", timerKey), true);

        int minPasswordLength = Membership.MinRequiredPasswordLength;
        this.ClientScript.RegisterStartupScript(this.GetType(), "setMinPasswordLength", string.Format("var minPasswordLength = '{0}';", minPasswordLength), true);
    }
}

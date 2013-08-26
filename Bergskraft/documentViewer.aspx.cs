using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Text;

public partial class documentViewer : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        int pageId;
        int pageNo;
        bool success = int.TryParse(Request.QueryString["pageId"], out pageId);
        bool success2 = int.TryParse(Request.QueryString["pageNo"], out pageNo);

        // register javascript to initalize map.
        StringBuilder sb = new StringBuilder(500);
        sb.Append(string.Format("init('{0}','{1}');", pageId.ToString(), pageNo.ToString()));
        this.Page.ClientScript.RegisterStartupScript(this.GetType(), "init" + this.ClientID, sb.ToString(), true);
    }
}

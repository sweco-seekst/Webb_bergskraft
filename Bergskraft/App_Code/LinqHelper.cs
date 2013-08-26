using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

/// <summary>
/// Summary description for LinqHelper
/// </summary>
public class LinqHelper {
    private LinqHelper() {
        //
        // TODO: Add constructor logic here
        //
    }

    /// <summary>
    /// Creates a DataContext using connectionstring named "SqlConn" and returns it.
    /// </summary>
    /// <returns></returns>
    public static BerGisDal.BerGisDalDataContext GetDataContext() {
        string connectionString = ConfigurationManager.ConnectionStrings["SqlConn"].ConnectionString;
        BerGisDal.BerGisDalDataContext ctx = new BerGisDal.BerGisDalDataContext(connectionString);
        return ctx;
    }
}

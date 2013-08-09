using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

namespace Sweco.Web.UI {

    public sealed class ClientScriptHandler {
        private const string SCRIPT_TEMPLATE = 
            "<script type=\"text/javascript\">var {0} = document.getElementById('{1}');</script>";

        /// <summary>
        /// Creates a javascript alias to use for the control.
        /// </summary>
        /// <param name="variableName">The name of the javascript variable, eg: gTxtName</param>
        /// <param name="control">The control to create an alias for.</param>
        public static void CreateClientAlias(Page page, string variableName, Control control) {
            page.ClientScript.RegisterStartupScript(page.GetType(), variableName,
               string.Format(SCRIPT_TEMPLATE, variableName, control.ClientID));
        }
    }
}
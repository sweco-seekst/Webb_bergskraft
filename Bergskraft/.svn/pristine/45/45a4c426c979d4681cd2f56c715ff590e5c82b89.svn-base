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

    /// <summary>
    /// Summary description for 
    /// </summary>
    public class GridViewHelper {
        private GridViewHelper() {
            //No creation
        }

        // DataControlField
        public static BoundField MakeBoundField(string dataField, string headerText) {
            BoundField field = new BoundField();
            field.DataField = dataField;
            field.HeaderText = headerText;
            return field;
        }

        public static HyperLinkField MakeHyperLinkField(string text, string dataTextField, string[] dataNaivigateUrlFields, string urlFormatString, string headerText, string target) {
            HyperLinkField fld = new HyperLinkField();
            fld.DataTextField = dataTextField;
            fld.Text = text;
            fld.DataNavigateUrlFields = dataNaivigateUrlFields;
            fld.DataNavigateUrlFormatString = urlFormatString;
            fld.HeaderText = headerText;
            fld.Target = target;
            return fld;
        }

        public static ButtonField MakeButtonField(string text, string dataTextField, string dataTextFormatString, string commandName, string headerText) {
            ButtonField fld = new ButtonField();
            fld.Text = text;
            fld.DataTextField = dataTextField;
            fld.DataTextFormatString = dataTextFormatString;
            fld.CommandName = commandName;
            fld.HeaderText = headerText;
            fld.ButtonType = ButtonType.Button;
            return fld;
        }
    }
}
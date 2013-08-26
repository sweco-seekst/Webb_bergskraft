using System;
using System.Diagnostics;
using System.Web.UI.WebControls;
using System.Data;

namespace Sweco.Web.UI {

    /// <summary>
    /// Container for a number of static methods used to handle HtmlSelect-controls and ListControls.
    /// </summary>
    public sealed class ListHandler {

        private ListHandler() {
            // No creation.
        }

        #region Methods to handle System.Web.UI.HtmlControls.HtmlSelect controls

        #endregion

        #region Methods to handle System.Web.UI.WebControls.ListControl controls

        /// <summary>
        /// Fills a ListControl with data.
        /// </summary>
        /// <param name="cbo"></param>
        /// <param name="dt"></param>
        public static void Fill(ListControl cbo, DataTable dt) {
            cbo.DataSource=dt;
            cbo.DataBind();
        }

        /// <summary>
        /// Fills a ListControl with data.
        /// </summary>
        /// <param name="cbo"></param>
        /// <param name="values">Jagged array of values to add to the listcontrol. Values on index 0 is text, index 1 is value.</param>
        /// <param name="defaultKeyValue"></param>
        /// <param name="append"></param>
        public static void Fill(ListControl cbo, string[][] values, string defaultKeyValue, bool append) {
            string dataTextField = cbo.DataTextField;
            string dataValueField = cbo.DataValueField;

            if (!append) { cbo.Items.Clear(); }

            for (int i=0; i<values.Length; i++) {
                cbo.Items.Add(new ListItem(values[i][0], values[i][1]));
            }

            // Set selected row.
            try {
                cbo.SelectedValue = defaultKeyValue;
            }
            catch (System.ArgumentOutOfRangeException) { }
        }

        /// <summary>
        /// Fills a ListControl and allows to add an empty row first.
        /// Will default the empty value to "-1".
        /// </summary>
        /// <param name="cbo"></param>
        /// <param name="dt"></param>
        /// <param name="addEmpty"></param>
        public static void Fill(ListControl cbo, DataTable dt, bool addEmpty) {
            cbo.DataSource=dt;
            cbo.DataBind();
            if (!addEmpty) {
                AddEmpty(cbo, "", "-1", false);
            }
        }

        /// <summary>
        /// Fills a ListControl with data and allows to specify selected value.
        /// </summary>
        /// <param name="cbo"></param>
        /// <param name="dt"></param>
        /// <param name="defaultKeyValue"></param>
        public static void Fill(ListControl cbo, DataTable dt, string defaultKeyValue) {
            cbo.DataSource=dt;
            cbo.DataBind();

            // Select the specified default value.
            try {
                cbo.SelectedValue = defaultKeyValue;
            }
            catch (System.ArgumentOutOfRangeException) {
                // ignore error
                Debug.Assert(false, "the specified default key value \"" + defaultKeyValue + "\" was not found.");
            }
        }

        /// <summary>
        /// Fills a ListControl with data with and adds an empty row at top or last.
        /// </summary>
        /// <param name="cbo"></param>
        /// <param name="dt"></param>
        /// <param name="defaultKeyValue"></param>
        /// <param name="emptyText">if addEmptyField = true, spceify the text for the empty field.</param>
        /// <param name="emptyValue"></param>
        /// <param name="addLast">false = Appends the emptystring first in the new fill.</param>
        public static void Fill(ListControl cbo, DataTable dt, string defaultKeyValue, string emptyText, string emptyValue, bool addLast) {
            cbo.DataSource=dt;
            cbo.DataBind();
            AddEmpty(cbo, emptyText, emptyValue, addLast);

            // Select the specified default value.
            try {
                cbo.SelectedValue = defaultKeyValue;
            }
            catch (System.ArgumentOutOfRangeException) {
                // ignore error
                Debug.Assert(false, "the specified default key value \"" + defaultKeyValue + "\" was not found.");
            }
        }

        #endregion

        /// <summary>
        /// Adds an empty row first or last in the ListControl control.
        /// </summary>
        /// <param name="sel"></param>
        /// <param name="emptyText"></param>
        /// <param name="emptyValue"></param>
        /// <param name="addLast"></param>
        public static void AddEmpty(ListControl sel, string emptyText, string emptyValue, bool addLast) {
            ListItem selItem = new ListItem(emptyText, emptyValue);
            if (addLast) {
                sel.Items.Add(selItem);
            } else {
                sel.Items.Insert(0, selItem);
            }
        }

    }
}

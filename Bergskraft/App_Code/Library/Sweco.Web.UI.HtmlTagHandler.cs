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

    public sealed class HtmlTagHandler {

        #region HTML Tag: div
        public static HtmlGenericControl Div(string cssClass) {
            HtmlGenericControl ctrl = new HtmlGenericControl("div");
            if (cssClass != null) {
                ctrl.Attributes.Add("class", cssClass);
            }
            return ctrl;
        }

        public static HtmlGenericControl Div(string cssClass, string content) {
            HtmlGenericControl ctrl = Div(cssClass);
            ctrl.InnerHtml = content;
            return ctrl;
        }

        public static HtmlGenericControl Div(string cssClass, string content, bool treatContentAsText) {
            HtmlGenericControl ctrl = Div(cssClass);
            if (treatContentAsText) {
                ctrl.InnerText = content;
            } else {
                ctrl.InnerHtml = content;
            }
            return ctrl;
        }

        public static HtmlGenericControl Div(string cssClass, params Control[] controls) {
            HtmlGenericControl ctrl = Div(cssClass);
            for (int i=0; i < controls.Length; i++) {
                ctrl.Controls.Add(controls[i]);
            }
            return ctrl;
        }
        #endregion

        #region HTML Tag: span
        public static HtmlGenericControl Span(string cssClass) {
            HtmlGenericControl ctrl = new HtmlGenericControl("span");
            if (cssClass != null) {
                ctrl.Attributes.Add("class", cssClass);
            }
            return ctrl;
        }

        public static HtmlGenericControl Span(string cssClass, string content) {
            HtmlGenericControl ctrl = Span(cssClass);
            ctrl.InnerHtml = content;
            return ctrl;
        }

        public static HtmlGenericControl Span(string cssClass, string content, bool treatContentAsText) {
            HtmlGenericControl ctrl = Span(cssClass);
            if (treatContentAsText) {
                ctrl.InnerText = content;
            } else {
                ctrl.InnerHtml = content;
            }
            return ctrl;
        }

        #endregion

        #region Input Button
        /// <summary>
        /// Creates a button control.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cssClass"></param>
        /// <param name="value"></param>
        /// <param name="onClick"></param>
        /// <returns></returns>
        public static HtmlInputButton Button(string id, string cssClass, string value, string onClick) {
			HtmlInputButton button = new HtmlInputButton();
            button.ID = id;
			if (cssClass != null) { button.Attributes["class"] = cssClass; }
            button.Value = value;
            if (onClick != null) { button.Attributes["onClick"] = onClick; }
            return button;
		}

		#endregion
    }
}
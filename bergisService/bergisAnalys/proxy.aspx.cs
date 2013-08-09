﻿using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Text;
using System.Net;
using System.IO;
using System.Collections.Generic;

public partial class Proxy : System.Web.UI.Page {
	protected void Page_Load(object sender, EventArgs e) {
        string url = string.Empty;
        if (Request.QueryString.AllKeys.Length > 1)
        {
            foreach (string s in Request.QueryString.AllKeys)
            {
                if (s != null)
                {
                    if (s == "url")
                    {
                        url = Request.QueryString[s].ToString();
                        if (!url.Contains("?"))
                        {
                            url = url + "?";
                        }
                        else {
                            url = url + "&";
                        }
                    }
                    else
                    {
                        url = url + s + "=" + Request.QueryString[s].ToString() + "&";
                    }
                }
                   
            }
            //Remove last &
            url = url.Remove(url.Length - 1, 1);
         }
        else
        {
            url = Request.QueryString["url"].ToString();
        }
		
		string data = GetPageContent(url);
		data = ParseData(data);
		Response.Write(data);
	}    
	private string GetPageContent(string url) {

		if (!url.StartsWith("http://")) {
			url = "http://" + url;
		}
		bool encode = false;

		string pageContent = null;

		HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
		if (request != null) {
			try {
				HttpWebResponse response = (HttpWebResponse)request.GetResponse();

				// Get page content
				// HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Encoding enc = Encoding.GetEncoding("utf-8");  // Windows default Code Page
				StreamReader reader = new StreamReader(response.GetResponseStream(), enc);
				pageContent = reader.ReadToEnd();

				if (encode) {
					pageContent = HttpUtility.HtmlEncode(pageContent);
				}
			}
			catch (Exception ex) {
                Trace.Write("Error in proxy: "+ex.Message);
			}
		}

		if (pageContent == null) {
			pageContent = string.Format("url:\"<b>{0}</b>\" could not be found.", url);
		}

		return pageContent;
	}

	private string ParseData(string data) {
		// TODO - remove all tabels. and retun data as XML.
		return data;
	}

}

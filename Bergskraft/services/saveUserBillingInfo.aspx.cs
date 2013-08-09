using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Configuration;

public partial class services_saveUserBillingInfo : System.Web.UI.Page
{
    protected override void OnPreInit(EventArgs e)
    {
        Page.Theme = "";
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string billLength = HttpUtility.UrlDecode(Request.QueryString["billLength"], Encoding.UTF8);
        string firstName = HttpUtility.UrlDecode(Request.QueryString["firstName"], Encoding.UTF8);
        string lastName = HttpUtility.UrlDecode(Request.QueryString["lastName"], Encoding.UTF8);
        string personalNr = Request.QueryString["personalNr"];
        
        string adress = HttpUtility.UrlDecode(Request.QueryString["adress"], Encoding.UTF8);
        string zipCode = Request.QueryString["zipCode"];
        string postalAdress = HttpUtility.UrlDecode(Request.QueryString["postalAdress"], Encoding.UTF8);
        //string country = HttpUtility.UrlDecode(Request.QueryString["country"], Encoding.UTF8);
        string phoneNumber = Request.QueryString["phoneNumber"];
        string cellPhone = Request.QueryString["cellPhone"];

        userInformation userInfo = new userInformation();
        userInfo.FirstName = firstName;
        userInfo.LastName = lastName;
        userInfo.PersonalNumber = personalNr;
        userInfo.Adress = adress;
        userInfo.ZipCode = zipCode;
        userInfo.PostalAdress = postalAdress;
        userInfo.PhoneNumber = phoneNumber;
        userInfo.CellPhone = cellPhone;
        
        saveUserBillingInfo newUserInfo = new saveUserBillingInfo();
        bool newUserResult = newUserInfo.save(userInfo);
        string responseText;
        if (newUserResult)
        {
            mailBillingInformation newBillingMail = new mailBillingInformation();
            bool newBillingMailResult = newBillingMail.mailBill(userInfo, billLength);
            if (newBillingMailResult)
            {
                alterUserViewTime altUserTime = new alterUserViewTime();
                bool alterTimeResult = altUserTime.alterTime(userInfo, int.Parse(billLength),"m",true,false);
                if (alterTimeResult)
                {
                    responseText = ConfigurationSettings.AppSettings["userAlterTimeSuccess"]; 
                }
                else
                {
                    responseText = ConfigurationSettings.AppSettings["userInfoMailFailed"];
                }
            }
            else
            {
                responseText = ConfigurationSettings.AppSettings["userInfoMailFailed"];
            }
        }
        else
        {
            responseText = ConfigurationSettings.AppSettings["userInfoSaveFailed"];
        }
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetExpires(DateTime.Now.AddDays(-1)); 
        Response.Write(responseText);
        Response.End();
    }
}

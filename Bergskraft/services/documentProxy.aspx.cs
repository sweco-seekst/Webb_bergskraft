using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.Configuration;
using System.Drawing.Imaging;
public partial class services_documentProxy : System.Web.UI.Page
{
    protected void Page_PreInit(object sender, EventArgs e)
    {
        Theme = "";
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string image = Request.QueryString["image"];

        paidToDate pDate = new paidToDate();
        //paidToDate.paymentStatus paymentStatus = pDate.checkPayment();

        //if (paymentStatus == paidToDate.paymentStatus.paid || paymentStatus == paidToDate.paymentStatus.freeViews)
        //{

            string imgPath = ConfigurationManager.AppSettings["pageImgPath"];
            try
            {
                System.Drawing.Image i = System.Drawing.Image.FromFile(imgPath + image);
                HttpContext.Current.Response.ContentType = "image/jpeg";
                i.Save(HttpContext.Current.Response.OutputStream, ImageFormat.Jpeg);
                i.Dispose();

                //if (paymentStatus == paidToDate.paymentStatus.freeViews)
                //{
                    imageCount increaseCount = new imageCount();
                    increaseCount.incPageCount();
                //}
            }
            catch (Exception ex)
            {
                image = ConfigurationManager.AppSettings["errorPic"];
                System.Drawing.Image i = System.Drawing.Image.FromFile(HttpRuntime.AppDomainAppPath + image);
                HttpContext.Current.Response.ContentType = "image/jpeg";
                i.Save(HttpContext.Current.Response.OutputStream, ImageFormat.Jpeg);
                i.Dispose();
            }
        //}
        //else
        //{
            //string timesUpImage = ConfigurationManager.AppSettings["timesUpImage"];
            //string pathToTimesUpImage = HttpRuntime.AppDomainAppPath + timesUpImage;
            //System.Drawing.Image img = System.Drawing.Image.FromFile(pathToTimesUpImage);
            //HttpContext.Current.Response.ContentType = "image/jpeg";
            //img.Save(HttpContext.Current.Response.OutputStream, ImageFormat.Jpeg);
            //img.Dispose();
        //}
    }
}

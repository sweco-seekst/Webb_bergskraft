using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Drawing.Imaging;
using System.Drawing;
using System.Text;

public partial class services_getWidthHeight : System.Web.UI.Page
{
    protected void Page_PreInit(object sender, EventArgs e)
    {
        Theme = "";
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string image = Request.QueryString.ToString();
        string decodedImage = HttpUtility.UrlDecode(image, Encoding.UTF8);
        image = decodedImage.Substring(6);
        //paidToDate pDate = new paidToDate();
        //paidToDate.paymentStatus paymentStatus = pDate.checkPayment();
        string imgWidth = "1";
        string imgHeight = "1";
        //if (paymentStatus == paidToDate.paymentStatus.paid || paymentStatus == paidToDate.paymentStatus.freeViews)
        //{
        //    try
        //    {
        //        string imgPath = ConfigurationManager.AppSettings["pageImgPath"];
        //        System.Drawing.Image i = System.Drawing.Image.FromFile(imgPath + image);
        //        SizeF sz = i.PhysicalDimension;
        //        imgWidth = sz.Width.ToString();
        //        imgHeight = sz.Height.ToString();
        //        i.Dispose();
        //    }
        //    catch (System.IO.FileNotFoundException ex)
        //    {

        //    }
        //}
        
        Response.Write(imgWidth + ";" + imgHeight);
        Response.End();
    }
}

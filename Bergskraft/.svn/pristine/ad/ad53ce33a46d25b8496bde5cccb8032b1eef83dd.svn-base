using System;
using System.Collections.Generic;
using System.Web;
using System.Configuration;
using System.Net.Mail;
using System.Text;

/// <summary>
/// Summary description for mailBillingInformation
/// </summary>
public class mailBillingInformation
{
    public bool mailBill(userInformation userInfo, string billLength)
    {
        try
        {
            string smtpFromAdress = ConfigurationSettings.AppSettings["smtpFromAdress"];
            string subject = ConfigurationManager.AppSettings["billingInformationSubject"];
            string smtpToBillingAdress = ConfigurationManager.AppSettings["mailAdressBillingInfo"];
            
            MailMessage message = new MailMessage(smtpFromAdress, smtpToBillingAdress);
            message.Subject = subject;

            StringBuilder sb = new StringBuilder();
            sb.AppendLine(ConfigurationSettings.AppSettings["billingInformationBody"]);
            sb.AppendLine();
            sb.AppendLine(ConfigurationSettings.AppSettings["billingInformationLengthTxt"] + billLength + " månader");
            sb.AppendLine("Förnamn: " + userInfo.FirstName);
            sb.AppendLine("Efternamn: " + userInfo.LastName);
            sb.AppendLine("Personnummer: " + userInfo.PersonalNumber);
            sb.AppendLine("Address: " + userInfo.Adress);
            sb.AppendLine("Postnummer: " + userInfo.ZipCode);
            sb.AppendLine("Ort: " + userInfo.PostalAdress);
            if (userInfo.PhoneNumber.Length > 0)
            {
                sb.AppendLine("Telefonnummer: " + userInfo.PhoneNumber);
            }
            if (userInfo.CellPhone.Length > 0)
            {
                sb.AppendLine("mobiltelefon: " + userInfo.CellPhone);
            }
            message.Body = sb.ToString();
            message.BodyEncoding = System.Text.Encoding.UTF8;
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Send(message);
            message.Dispose();
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Security;
using BerGisDal;
using System.Linq;
using System.Configuration;

/// <summary>
/// Summary description for paidToDate
/// </summary>
public class paidToDate
{
    public enum paymentStatus
    {
        paid,
        notPaid,
        freeViews
    }
    public paymentStatus checkPayment()
    {
        MembershipUser usr = Membership.GetUser();
        if (usr != null)
        {
            Guid uID = (Guid)usr.ProviderUserKey;
            string userId = uID.ToString();

            BerGisDalDataContext ctx = LinqHelper.GetDataContext();
            IQueryable<DateTime> hasPaid = from u in ctx.UserDatas
                                           where u.UserId.Equals(userId)
                                           select (DateTime)u.PaymentValidToDate;

            int currentImageCount = (from u in ctx.UserDatas
                                     where u.UserId.Equals(userId)
                                     select u.ImageCount).Single();

            paymentStatus payment = paymentStatus.notPaid;
            foreach (DateTime dt in hasPaid)
            {
                //if compareDate returns 1 than the user must pay, otherwise -1 is returned.
                int compareDate = DateTime.Now.CompareTo(dt);
                if (compareDate == -1)
                {
                    payment = paymentStatus.paid;
                }
            }
            if (payment == paymentStatus.notPaid)
            {
                int maxCount;
                bool maxFlag = int.TryParse(ConfigurationManager.AppSettings["maxCount"], out maxCount);
                if (currentImageCount <= maxCount)
                {
                    payment = paymentStatus.freeViews;
                }
            }
            return payment;
        }
        else
        {
            return paymentStatus.notPaid;
        }
    }
    public paidToDate()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}

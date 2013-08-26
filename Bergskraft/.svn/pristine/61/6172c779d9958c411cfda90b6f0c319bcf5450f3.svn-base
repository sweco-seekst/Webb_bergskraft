using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using BerGisDal;

/// <summary>
/// Summary description for alterUserViewTime
/// </summary>
public class alterUserViewTime
{
    //This function recieve the userData aswell as time to be increased or decreased.
    //timeSize is the actual time being inc/dec ex: 12 month or 24 hours.
    //timeType = year/month/day/hour, pass parameter as following y/m/d/h
    //increase = true/false depending on the wish of increasing time or decreasing time.
    //decrease = true/false same as above.
    public bool alterTime(userInformation userInfo, int timeSize, string timeType, bool increase, bool decrease)
    {
        try
        {
            BerGisDalDataContext ctx = LinqHelper.GetDataContext();

            var user = (from u in ctx.UserDatas
                        where u.UserId.Equals(userInfo.UserId)
                        select u).Single();

            DateTime userDateTime = (DateTime)user.PaymentValidToDate;

            if (increase)
            {
                switch (timeType)
                {
                    case "y":
                        userDateTime = userDateTime.AddYears(timeSize);
                        break;
                    case "m":
                        userDateTime = userDateTime.AddMonths(timeSize);
                        break;
                    case "d":
                        userDateTime = userDateTime.AddDays(timeSize);
                        break;
                    case "h":
                        userDateTime = userDateTime.AddHours(timeSize);
                        break;
                    default:
                        userDateTime = userDateTime.AddSeconds(timeSize);
                        break;
                }
            }
            else if (decrease)
            {
                switch (timeType)
                {
                    case "y":
                        userDateTime = userDateTime.AddYears(-timeSize);
                        break;
                    case "m":
                        userDateTime = userDateTime.AddMonths(-timeSize);
                        break;
                    case "d":
                        userDateTime = userDateTime.AddDays(-timeSize);
                        break;
                    case "h":
                        userDateTime = userDateTime.AddHours(-timeSize);
                        break;
                    default:
                        userDateTime = userDateTime.AddSeconds(-timeSize);
                        break;
                }
            }
            user.PaymentValidToDate = userDateTime;
            ctx.SubmitChanges();
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}

using bergisService.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bergisService.Models
{
    public class PostService
    {

        public string Post(PostData postData)
        {
            PostHelper helper = new PostHelper();
            string comment = postData.comment;
            string objectInfo = postData.objectInfo;
            string date = postData.date;
            string result = helper.Post(comment, objectInfo, date);

            return result;
        }

        public string ChangeStatus(int id)
        {
            PostHelper helper = new PostHelper();
            return helper.ChangeStatus(id);
        }
    }
}
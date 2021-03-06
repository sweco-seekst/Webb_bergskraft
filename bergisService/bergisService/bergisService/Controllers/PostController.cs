﻿using bergisService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace bergisService.Controllers
{
    public class PostController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            PostService service = new PostService();
            return service.ChangeStatus(id);
        }

        // POST api/values
        public string Post([FromBody]PostData postData)
        {
            PostService service = new PostService();
            return service.Post(postData);
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
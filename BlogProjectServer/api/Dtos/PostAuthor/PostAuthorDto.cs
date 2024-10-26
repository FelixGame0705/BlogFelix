using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;

namespace api.Dtos.PostAuthor
{
    public class PostAuthorDto
    {
        public int PostID { get; set; }
        // public Post Post{get;set;}
        public string AppUserID { get; set; }
    }
}
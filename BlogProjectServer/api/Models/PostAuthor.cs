using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("PostAuthor")]
    public class PostAuthor
    {
        public int PostID{get;set;}
        public Post? Post{get;set;}
        public string? AppUserID{get;set;}
        public AppUser? AppUser {get;set;}
    }
}
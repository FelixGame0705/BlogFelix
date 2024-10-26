using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Comment")]
    public class Comment
    {
        public int CommentID {get;set;}
        public int? PostID {get;set;}
        public string? AppUserID {get;set;}
        public string? Content {get;set;}
        public string? avatarURL{get;set;}
        public string? fullName{get;set;}
        public DateTime TimeStamp {get;set;} = DateTime.Now;
        public Post? Post{get;set;}
        public AppUser? AppUser {get;set;}
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CommentDto
    {
        public int? CommentID {get;set;}
        public int? PostID {get;set;}
        public string? AppUserID {get;set;}
        public string? Content {get;set;}
        public DateTime TimeStamp {get;set;} = DateTime.Now;
        public string? AvatarURL = string.Empty;
        public string? FullName = string.Empty;
    }
}
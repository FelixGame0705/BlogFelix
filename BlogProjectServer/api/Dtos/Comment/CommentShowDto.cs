using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CommentShowDto
    {
        public int commentID{get;set;}
        public int? postID{get;set;}
        public string userName{get;set;}
        public string content{get;set;}
        public DateTime timeStamp{get;set;}
        public string? AvatarURL = string.Empty;
        public string? FullName = string.Empty;
    }
}
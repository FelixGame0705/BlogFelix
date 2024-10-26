using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CreateCommentRequestDto
    {
        public int postID {get;set;}
        public string? AppUserID {get;set;} = string.Empty;
        public string? Content {get;set;}
        public DateTime TimeStamp {get;set;} = DateTime.Now;
        public string? AvatarURL{get;set;} = string.Empty;
        public string? FullName{get;set;} = string.Empty;
    }
}
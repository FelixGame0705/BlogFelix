using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class CommentQueryObjectOnPost
    {
        public int PostID {get;set;}
        public int FromCommentNumber {get;set;} = 1;
        public int ToCommentNumber {get;set;} = 10;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public bool IsDescending { get; set; } = true;
    }
}
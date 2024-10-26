using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.PostAuthor
{
    public class UpdatePostAuthorRequestDto
    {
        public int PostID{get;set;}
        // public Post Post{get;set;}
        public string AppUserID{get;set;}
    }
}
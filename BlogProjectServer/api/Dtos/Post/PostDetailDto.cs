using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.PostAuthor;

namespace api.Dtos.Post
{
    public class PostDetailDto
    {
        public int PostID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public DateTime PublicationDate { get; set; }
        public string Tags { get; set; }

        public List<PostAuthorDetailDto> PostAuthors { get; set; }
        //public List<Comment> Comments { get; set; }
        //public List<Interaction> Interactions { get; set; }
    }
}
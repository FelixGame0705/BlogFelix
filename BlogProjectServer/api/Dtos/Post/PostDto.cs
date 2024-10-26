using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Post
{
    public class PostDto
    {
        public int PostID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public DateTime PublicationDate { get; set; }
        public string Tags { get; set; }

        //public List<PostAuthor> PostAuthors { get; set; }
        //public List<Comment> Comments { get; set; }
        //public List<Interaction> Interactions { get; set; }
    }
}
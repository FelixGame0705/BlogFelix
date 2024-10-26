using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Post")]
    public class Post
    {
        public int PostID {get; set;}
        public string Title {get;set;}
        public string Content {get;set;}
        public string Category {get;set;}
        public string Status {get;set;}
        public DateTime PublicationDate {get;set;} = DateTime.Now;
        public string Tags {get;set;}
        
       public List<PostAuthor> PostAuthors { get; set; } 
        public List<Comment> Comments {get;set;}
        public List<Interaction> Interactions {get;set;}
    }
}
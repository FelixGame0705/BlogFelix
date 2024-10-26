using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        public string? AvatarUrl {get;set;}
        public List<PostAuthor> PostAuthors { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Interaction> Interactions { get; set; }
    }
}
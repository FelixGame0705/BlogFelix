using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Interaction")]
    public class Interaction
    {
        public int InteractionID {get;set;}
        public string? AppUserID {get;set;}
        public int? PostID {get;set;}
        public string Type {get;set;}
        public DateTime Timestamp {get;set;}
        public AppUser? AppUser{get;set;}        
        public Post? Post{get;set;}
    }
}
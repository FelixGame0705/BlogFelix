using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Post
{
    public class CreatePostRequestDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        [Required]
        public string Category { get; set; } = string.Empty;
        public string Tags { get; set; }= string.Empty;
        public string AppUserID {get;set;}= string.Empty;
    }
}
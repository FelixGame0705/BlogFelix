using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Images")]
    public class Images
    {
        [Key]
        public int ImageID { get; set; }
        public string? ImageUrl { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public string? TypeImage { get; set; } // e.g., "avatar", "post", "comment"
    }
}
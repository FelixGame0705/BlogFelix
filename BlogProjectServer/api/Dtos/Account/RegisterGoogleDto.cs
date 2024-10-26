using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class RegisterGoogleDto
    {
        [Required]
        [EmailAddress]
        public string? Email{get;set;}

        public string? AvatarUrl{get;set;}
    }
}
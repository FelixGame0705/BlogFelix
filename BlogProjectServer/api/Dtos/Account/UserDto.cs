using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class UserDto
    {
        public string UserName{get;set;}
        public string Email{get;set;}
        public string AvatarUrl{get;set;}
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;

namespace api.Dtos.PostAuthor
{
    public class PostAuthorDetailDto
    {
        public string UserName{get;set;}
        public string Email{get;set;}
        public string AvatarUrl{get;set;}
        // public UserDto UserInfo { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Dtos.PostAuthor;
using api.Models;

namespace api.Mappers
{
    public static class AppUserMapper
    {
        public static UserDto ToUserrDto(this AppUser appUser){
            return new UserDto{
                UserName = appUser.UserName,
                Email = appUser.Email,
                AvatarUrl = appUser.AvatarUrl
            };
        }
    }
}
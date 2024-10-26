using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.PostAuthor;
using api.Models;

namespace api.Mappers
{
    public static class PostAuthorMapper
    {
        public static PostAuthorDto ToPostAuthorDto(this PostAuthor postAuthor){
            return new PostAuthorDto{
                AppUserID = postAuthor.AppUserID,
                PostID = postAuthor.PostID
            };
        }

        public static PostAuthorDetailDto ToPostAuthorDetailDto(this PostAuthor postAuthor){
            return new PostAuthorDetailDto{
                Email = postAuthor.AppUser.ToUserrDto().Email,
                AvatarUrl = postAuthor.AppUser.ToUserrDto().AvatarUrl,
                UserName = postAuthor.AppUser.ToUserrDto().UserName
            };
        }

        public static PostAuthor ToPostAuthorFromCreate(this CreatePostAuthorRequestDto postAuthorDto, int postID){
            return new PostAuthor{
                AppUserID = postAuthorDto.AppUserID,
                PostID = postID
            };
        }

        public static PostAuthor ToPostAuthorFromUpdate(this UpdatePostAuthorRequestDto postAuthorDto, int postID){
            return new PostAuthor{
                AppUserID = postAuthorDto.AppUserID,
                PostID = postID
            };
        }
    }
}
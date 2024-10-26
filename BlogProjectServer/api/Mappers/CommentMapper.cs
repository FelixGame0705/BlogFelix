using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Models;

namespace api.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment commentModel){
            return new CommentDto{
                CommentID = commentModel.CommentID,
                Content = commentModel.Content,
                PostID = commentModel.PostID,
                AppUserID = commentModel.AppUserID,
                TimeStamp = commentModel.TimeStamp,
                AvatarURL = commentModel.avatarURL,
                FullName = commentModel.fullName
            };
        }

        public static Comment ToCommentFromCreate(this CreateCommentRequestDto commentModel, int postID){
            return new Comment{
                AppUserID = commentModel.AppUserID,
                PostID = commentModel.postID,
                Content = commentModel.Content,
                TimeStamp = commentModel.TimeStamp,
                avatarURL = commentModel.AvatarURL,
                fullName = commentModel.FullName
            };
        }
        
        public static Comment ToCommentFromUpdate(this UpdateCommentRequestDto commentModel, int postID){
            return new Comment{
                AppUserID = commentModel.AppUserID,
                PostID = postID,
                Content = commentModel.Content,
                TimeStamp = commentModel.TimeStamp,
                avatarURL = commentModel.AvatarURL,
                fullName = commentModel.FullName
            };
        }
    }
}
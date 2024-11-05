using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Post;
using api.Models;

namespace api.Mappers
{
    public static class PostMapper
    {
        public static PostDto ToPostDto(this Post postModel){
            return new PostDto{
                PostID = postModel.PostID,
                Category = postModel.Category,
                Content = postModel.Content,
                PublicationDate = postModel.PublicationDate,
                Tags = postModel.Tags,
                Title = postModel.Title
            };
        }

        public static PostDetailDto ToPostDetailDto(this Post postModel){
            return new PostDetailDto{
                PostID = postModel.PostID,
                Category = postModel.Category,
                Content = postModel.Content,
                PublicationDate = postModel.PublicationDate,
                Tags = postModel.Tags,
                Title = postModel.Title,
                PostAuthors = postModel.PostAuthors.Select(s=>s.ToPostAuthorDetailDto()).ToList()
                
            };
        }

        public static Post ToPostFromCreateDto(this CreatePostRequestDto postModel){
            return new Post{
                // PostID = postModel.PostID,
                Category = postModel.Category,
                Content = postModel.Content,
                Status = "Active",
                // PublicationDate = postModel.PublicationDate,
                Tags = postModel.Tags,
                Title = postModel.Title
            };
        }

        public static Post ToPostFromUpdateDto(this UpdatePostRequestDto postModel){
            return new Post{
                // PostID = postModel.PostID,
                Category = postModel.Category,
                Content = postModel.Content,
                // PublicationDate = postModel.PublicationDate,
                Status = "Active",
                Tags = postModel.Tags,
                Title = postModel.Title
            };
        }
    }
}
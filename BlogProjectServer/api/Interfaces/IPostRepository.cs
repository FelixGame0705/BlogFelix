using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IPostRepository
    {
        Task<List<Post>> GetAllAsync(PostQueryObject query);
        Task<Post?> GetByIdAsync(int id);
        Task<Post> CreateAsync(Post postModel );
        Task<Post?> UpdateAsync(int id, Post postModel);
        Task<Post?> DeleteAsync(int id);
        Task<int> GetTotalPosts(PostQueryObject query);
        Task<List<string>> GetListCategories();
    }
}
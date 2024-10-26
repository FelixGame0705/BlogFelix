using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IPostAuthorRepository
    {
        Task<List<PostAuthor>> GetAllAsync();
        Task<PostAuthor?> GetByIdAsync(int id);
        Task<PostAuthor> CreateAsync(PostAuthor postModel );
        Task<PostAuthor?> UpdateAsync(int id, PostAuthor postModel);
        Task<PostAuthor?> DeleteAsync(int id);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IImagesRepository
    {
        Task<List<Images>> GetAllAsync(string? typeImage = null);
        Task<Images> CreateAsync(Images postModel );
        Task<Images?> DeleteAsync(int id);
    }
}
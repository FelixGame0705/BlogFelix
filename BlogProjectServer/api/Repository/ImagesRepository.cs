using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ImagesRepository : IImagesRepository
    {
        private readonly ApplicationDBContext _context;
        // Constructor to inject the ApplicationDBContext

        public ImagesRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public Task<List<Images>> GetAllAsync(string? typeImage = null)
        {
            // Implementation for retrieving all images
            var images = _context.Images.AsQueryable().Where(i => string.IsNullOrEmpty(typeImage) || i.TypeImage == typeImage);
            return Task.FromResult(images.ToList());
        }
        public async Task<Images> CreateAsync(Images imageModel)
        {
            await _context.Images.AddAsync(imageModel);
            await _context.SaveChangesAsync();
            return imageModel;
        }
        public async Task<Images?> DeleteAsync(int id)
        {
            var imageModel = await _context.Images.FirstOrDefaultAsync(x => x.ImageID == id);
            if (imageModel == null)
            {
                return null;
            }

            _context.Images.Remove(imageModel);
            await _context.SaveChangesAsync();
            return imageModel;
        }
    }
}
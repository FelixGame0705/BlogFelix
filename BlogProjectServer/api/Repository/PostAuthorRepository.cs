using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PostAuthorRepository : IPostAuthorRepository
    {

        private readonly ApplicationDBContext _context;
        private readonly UserManager<AppUser> _userManager;
        public PostAuthorRepository(ApplicationDBContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<PostAuthor> CreateAsync(PostAuthor postModel)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(pa=>pa.Id == postModel.AppUserID);
            
            var existingPostAuthor = await _context.PostAuthors
            .FirstOrDefaultAsync(pa => pa.PostID == postModel.PostID && pa.AppUserID == user.Id);
        

            if (existingPostAuthor == null)
            {
                await _context.PostAuthors.AddAsync(postModel);
            }

            await _context.SaveChangesAsync();
            return postModel;
            // throw new NotImplementedException();
        }

        public async Task<PostAuthor?> DeleteAsync(int id)
        {
            // throw new NotImplementedException();
            var postModel = await _context.PostAuthors.FirstOrDefaultAsync(x => x.PostID == id);
            if (postModel == null)
            {
                return null;
            }

            _context.PostAuthors.Remove(postModel);
            await _context.SaveChangesAsync();
            return postModel;
        }

        public async Task<List<PostAuthor>> GetAllAsync()
        {
            var posts = _context.PostAuthors.AsQueryable();
            return await posts.ToListAsync();
        }

        public async Task<PostAuthor?> GetByIdAsync(int id)
        {
            return await _context.PostAuthors.FirstOrDefaultAsync(i => i.PostID == id);
        }

        public async Task<PostAuthor?> UpdateAsync(int id, PostAuthor postDto)
        {
            var existingPost = await _context.PostAuthors.FirstOrDefaultAsync(x => x.PostID == id);
            if (existingPost == null)
            {
                return null;
            }
            existingPost.PostID = postDto.PostID;

            await _context.SaveChangesAsync();
            return existingPost;
        }
    }
}
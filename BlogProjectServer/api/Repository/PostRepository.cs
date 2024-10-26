using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Post;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationDBContext _context;
        public PostRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Post> CreateAsync(Post postModel)
        {
            await _context.Posts.AddAsync(postModel);
            await _context.SaveChangesAsync();
            return postModel;
            // throw new NotImplementedException();
        }

        public async Task<Post?> DeleteAsync(int id)
        {
            // throw new NotImplementedException();
            var postModel = await _context.Posts.FirstOrDefaultAsync(x => x.PostID == id);
            if (postModel == null)
            {
                return null;
            }

            _context.Posts.Remove(postModel);
            await _context.SaveChangesAsync();
            return postModel;
        }

        public async Task<List<Post>> GetAllAsync(PostQueryObject query)
        {
            var posts = _context.Posts.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.PostName))
            {
                posts = posts.Where(s => s.Title.Contains(query.PostName));
            }
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Title", StringComparison.OrdinalIgnoreCase))
                {
                    posts = query.IsDecsending ? posts.OrderByDescending(s => s.Title) : posts.OrderBy(s => s.Title);
                }
                else if (query.SortBy.Equals("UpdateTime", StringComparison.OrdinalIgnoreCase))
                {
                    posts = query.IsDecsending ? posts.OrderByDescending(s => s.PublicationDate) : posts.OrderBy(s => s.PublicationDate);
                }

            }
            if (query.Categories != null && query.Categories.Any())
            {
                posts = posts.Where(s => query.Categories.Contains(s.Category));
            }
            Console.WriteLine("index: " + query.PageNumber + " size: " + query.PageSize);
            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await posts.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<int> GetTotalPosts(PostQueryObject query)
        {
            var posts = _context.Posts.AsQueryable();

            // Kiểm tra xem categories có null hoặc rỗng không
            if (query.Categories != null && query.Categories.Any())
            {
                // Lọc bài viết theo category
                posts = posts.Where(s => query.Categories.Contains(s.Category));
            }

            // Trả về số lượng bài viết phù hợp
            return await posts.CountAsync();
        }

        public async Task<Post?> GetByIdAsync(int id)
        {
            return await _context.Posts.Include(c => c.PostAuthors).ThenInclude(c => c.AppUser).FirstOrDefaultAsync(i => i.PostID == id);
        }

        public async Task<Post?> UpdateAsync(int id, Post postDto)
        {
            var existingPost = await _context.Posts.FirstOrDefaultAsync(x => x.PostID == id);
            if (existingPost == null)
            {
                return null;
            }
            existingPost.Title = postDto.Title;
            existingPost.Content = postDto.Content;
            existingPost.Category = postDto.Category;

            await _context.SaveChangesAsync();
            return existingPost;
        }

        public async Task<List<string>> GetListCategories()
        {
            return await _context.Posts.Select(p => p.Category).Distinct().ToListAsync();
        }
    }
}
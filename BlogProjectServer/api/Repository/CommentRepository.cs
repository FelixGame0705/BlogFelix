using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Comment;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
            // throw new NotImplementedException();
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            // throw new NotImplementedException();
            var commentModel = await _context.Comments.FirstOrDefaultAsync(x => x.CommentID == id);
            if (commentModel == null)
            {
                return null;
            }

            _context.Comments.Remove(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<List<Comment>> GetAllAsync(CommentQueryObject query)
        {
            var comments = _context.Comments.Include(a => a.AppUser).AsQueryable();

            // if(!string.IsNullOrWhiteSpace(query.)){
            //     comments = comments.Where(s => s.Post.PostID == query.PostID);
            // }
            // if(query.IsDecsending == true){
            //     comments = comments.OrderByDescending(c => c.);
            // }
            return await comments.ToListAsync();
        }

        public async Task<List<CommentShowDto>> GetAllCommentOnPostAsync(CommentQueryObjectOnPost queryObject)
        {
            //  var comments = _context.Comments.Include(a=>a.AppUser).AsQueryable();
            var dbComments = from c in _context.Comments
                             join p in _context.Posts on c.PostID equals p.PostID
                             where c.PostID == p.PostID
                             select new CommentShowDto
                             {
                                 commentID = c.CommentID,
                                 postID = c.PostID,
                                 content = c.Content,
                                 timeStamp = c.TimeStamp,
                                 AvatarURL = c.avatarURL,
                                 FullName = c.fullName
                             };
            if (queryObject.PostID != null)
            {
                dbComments = dbComments.Where(s => s.postID == queryObject.PostID);
            }

            if (queryObject.IsDescending)
            {
                dbComments = dbComments.OrderByDescending(c => c.timeStamp);
            }
            else
            {
                dbComments = dbComments.OrderBy(c => c.timeStamp);
            }
            var skipNumber = (queryObject.PageNumber - 1) * queryObject.PageNumber;
            // if(!string.IsNullOrWhiteSpace(query.)){
            //     comments = comments.Where(s => s.Post.PostID == query.PostID);
            // }
            // if(query.IsDecsending == true){
            //     comments = comments.OrderByDescending(c => c.);
            // }
            return await dbComments.Skip(skipNumber).Take(queryObject.PageSize).ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.Include(c => c.AppUser).FirstOrDefaultAsync(i => i.CommentID == id);
        }

        public async Task<Comment?> UpdateAsync(int id, Comment commentDto)
        {
            var existingComment = await _context.Comments.FirstOrDefaultAsync(x => x.CommentID == id);
            if (existingComment == null)
            {
                return null;
            }
            existingComment.Content = commentDto.Content;

            await _context.SaveChangesAsync();
            return existingComment;
        }
    }
}
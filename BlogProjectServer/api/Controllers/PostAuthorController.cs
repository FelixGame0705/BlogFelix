using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.PostAuthor;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/post-author")]
    [ApiController]
    public class PostAuthorController : ControllerBase
    {
        private readonly IPostAuthorRepository _postAuthorRepo;
        private readonly IPostRepository _postRepo;
        private readonly UserManager<AppUser> _userManager;

        public PostAuthorController(IPostAuthorRepository postAuthorRepo, IPostRepository postRepo, UserManager<AppUser> userManager)
        {
            _postAuthorRepo = postAuthorRepo;
            _postRepo = postRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var postAuthors = await _postAuthorRepo.GetAllAsync();

            var postAuthorDto = postAuthors.Select(s => s.ToPostAuthorDto());
            return Ok(postAuthorDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var postAuthor = await _postAuthorRepo.GetByIdAsync(id);
            if (postAuthor == null)
            {
                return NotFound();
            }

            return Ok(postAuthor.ToPostAuthorDto());
        }

        [HttpPost]
        [Route("{postID:int}")]
        public async Task<IActionResult> Create([FromRoute] int postID, CreatePostAuthorRequestDto postAuthorDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // var post = await _postRepo.GetByIdAsync(postID);



            // var username = User.GetUsername();
            // var appUser = await _userManager.FindByNameAsync(username);
            var postAuthorModel = postAuthorDto.ToPostAuthorFromCreate(postID);
            // postAuthorModel.AppUserID = appUser.Id;
            
            await _postAuthorRepo.CreateAsync(postAuthorModel);
            return CreatedAtAction(nameof(GetById), new { id = postAuthorModel.PostID }, postAuthorModel.ToPostAuthorDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id,UpdatePostAuthorRequestDto postAuthorDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var postAuthor = await _postAuthorRepo.UpdateAsync(id, postAuthorDto.ToPostAuthorFromUpdate(id));

            if (postAuthor == null)
            {
                return NotFound("PostAuthor not found");
            }
            return Ok(postAuthor.ToPostAuthorDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var postAuthorModel = await _postAuthorRepo.DeleteAsync(id);
            if (postAuthorModel == null)
            {
                return NotFound("PostAuthor does not exist");
            }

            return Ok(postAuthorModel);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Post;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IPostRepository _postRepo;
        private readonly IPostAuthorRepository _postAuthorRepo;
        public PostController(ApplicationDBContext context, IPostRepository postRepository)
        {
            _postRepo = postRepository;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PostQueryObject query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var posts = await _postRepo.GetAllAsync(query);
            var postDto = posts.Select(s => s.ToPostDto());
            var rs = new {
                data = posts,
                totalBlogs = await _postRepo.GetTotalPosts(query)
            };
            return Ok(rs);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var categories = await _postRepo.GetListCategories();
            return Ok(categories);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var post = await _postRepo.GetByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post.ToPostDetailDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePostRequestDto postDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var postModel = postDto.ToPostFromCreateDto();
            await _postRepo.CreateAsync(postModel);
            return CreatedAtAction(nameof(GetById), new { id = postModel.PostID }, postModel.ToPostDto());
        }
        // [HttpGet]

        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult> Update([FromRoute] int id, [FromBody] UpdatePostRequestDto postDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var postModel = await _postRepo.UpdateAsync(id, postDto.ToPostFromUpdateDto());

            if (postModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var postModel = await _postRepo.DeleteAsync(id);

            if (postModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
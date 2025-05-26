using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("api/")]
    public class ImagesController : Controller
    {
        private readonly IImagesRepository _imagesRepository;
        private readonly UserManager<AppUser> _userManager;

        public ImagesController(IImagesRepository imagesRepo, UserManager<AppUser> userManager)
        {
            _imagesRepository = imagesRepo;
            _userManager = userManager;
        }

        [HttpGet("images")]
        public async Task<IActionResult> GetAll([FromQuery] string? typeImage = null)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var images = await _imagesRepository.GetAllAsync(typeImage);
            if (images == null || !images.Any())
            {
                return NotFound("No images found.");
            }
            return Ok(images);
        }

        [HttpPost("createImages")]
        public async Task<IActionResult> Create([FromBody] Images imageModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (imageModel == null)
            {
                return BadRequest("Image model cannot be null.");
            }

            var createdImage = await _imagesRepository.CreateAsync(imageModel);
            if (createdImage == null)
            {
                return StatusCode(500, "An error occurred while creating the image.");
            }
            return CreatedAtAction(nameof(GetAll), new { id = createdImage.ImageID }, createdImage);
        }
        [HttpDelete("deleteImages/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var deletedImage = await _imagesRepository.DeleteAsync(id);
            if (deletedImage == null)
            {
                return NotFound($"Image with ID {id} not found.");
            }
            return Ok(deletedImage);
        }
    }
}
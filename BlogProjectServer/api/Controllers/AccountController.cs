using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using api.Migrations;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signinManager;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
            var roles = await _userManager.GetRolesAsync(user);
            var id = await _userManager.GetUserIdAsync(user);
            if (user == null) return Unauthorized("Invalid username");
            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Username not found nad/or password incorrect");
            }
            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user, roles, id)
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var appUser = new AppUser
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var user = await _userManager.Users.FirstOrDefaultAsync(e=>e.Email == registerDto.Email);
                    var roleResult = await _userManager.AddToRoleAsync(user, "AppUser");
                    var roles = await _userManager.GetRolesAsync(user);
                    var id = await _userManager.GetUserIdAsync(user);
                    if (roleResult.Succeeded)
                    {
                        Console.WriteLine("OKE 123", roleResult.ToString());
                        return Ok(
                            new NewUserDto
                            {
                                UserName = user.UserName,
                                Email = user.Email,
                                Token = _tokenService.CreateToken(user, roles, id)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("registerGoogle")]
        public async Task<IActionResult> RegisterWithGoogle([FromBody] RegisterGoogleDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var appUser = new AppUser
                {
                    UserName = registerDto.Email,
                    Email = registerDto.Email,
                    AvatarUrl = registerDto.AvatarUrl
                };
                var user = await _userManager.FindByEmailAsync(appUser?.Email);
                if (user == null)
                {
                    var createdUser = await _userManager.CreateAsync(appUser);

                    if (createdUser.Succeeded)
                    {
                        var userCreated = await _userManager.FindByEmailAsync(appUser?.Email);
                        var roleResult = await _userManager.AddToRoleAsync(userCreated, "User");
                        var roles = await _userManager.GetRolesAsync(userCreated);
                        var id = await _userManager.GetUserIdAsync(userCreated);
                        if (roleResult.Succeeded)
                        {
                            Console.WriteLine("OKE 123", roleResult.ToString());
                            return Ok(
                                new NewUserGoogleDto
                                {
                                    Email = userCreated.Email,
                                    AvatarUrl = userCreated.AvatarUrl,
                                    Token = _tokenService.CreateTokenForGoogleAccount(userCreated, roles, id)
                                }
                            );
                        }
                        else
                        {
                            return StatusCode(500, roleResult.Errors);
                        }
                    }
                    else
                    {
                        return StatusCode(500, createdUser.Errors);
                    }
                } else{
                    var roles = await _userManager.GetRolesAsync(user);
                    var id = await _userManager.GetUserIdAsync(user);

                   return Ok(
                                new NewUserGoogleDto
                                {
                                    Email = user.Email,
                                    AvatarUrl = user.AvatarUrl,
                                    Token = _tokenService.CreateTokenForGoogleAccount(user, roles, id)
                                }
                            );
                }



            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
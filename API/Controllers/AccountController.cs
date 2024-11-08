using API.Data;
using API.DTOs;
using API.Entites;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(UserManager<AppUser> userManager, IMapper mapper, ITokenService tokenService) : BaseController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await userManager.FindByNameAsync(registerDto.Username) != null) return BadRequest("Username already exists");

            var user = mapper.Map<AppUser>(registerDto);

            if (registerDto.Username == null) return BadRequest("Username is empty");

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if (registerDto.Username.Contains("Admin"))
            {
                await userManager.AddToRoleAsync(user, "Admin");

            } 
            else
            {
                await userManager.AddToRoleAsync(user, "User");

            }

            if (!result.Succeeded) return BadRequest(result.Errors);

            if (user.UserName == null) throw new Exception("Username is null");

            return new UserDto
            {
                Name = user.Name,
                Username = user.UserName,
                JobTitle = user.JobTitle,
                PhotoUrl = user.PhotoUrl,
                Token = await tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (!await userManager.Users.AnyAsync(u => u.NormalizedUserName == loginDto.Username)) return BadRequest("No username matches an account within the database");

            if (user == null) return BadRequest("Please enter a valid");
            
            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized();

            if (user.UserName == null) throw new Exception("Username is null");

            return new UserDto 
            {
                Name = user.Name,
                Username = user.UserName,
                JobTitle = user.JobTitle,
                PhotoUrl = user.PhotoUrl,
                Token = await tokenService.CreateToken(user)
            };
            
        }
    }
}

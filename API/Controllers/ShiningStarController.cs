using API.Data;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ShiningStarController(IShiningStarService shiningStarService) : BaseController
    {

        [HttpGet]

        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await shiningStarService.GetUsers();

            return Ok(users);
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> SubmitShiningStar(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return Forbid("Username cannot be null or empty.");
            }

            var user = await shiningStarService.SubmitShiningStar(username) ?? throw new Exception("Username is null");
            return Ok(user);
        }


    }
}

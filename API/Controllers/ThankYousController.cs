using API.Data;
using API.DTOs;
using API.Entites;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThankYousController(DataContext context, IThankYouService thankYouService) : BaseController
    {
        [HttpPut]
        public async Task<ActionResult<ThankYous>> SubmitThankYous(ThankYousDto thankYousDto)
        {
            var thankYous = await thankYouService.SubmitThankYous(thankYousDto);

            if (thankYous == null) return BadRequest("All fields must be filled out");

            context.ThankYous.Add(thankYous);

            return Ok(thankYous);
        }

        [HttpGet]
        public async Task<IEnumerable<ThankYous?>> GetThankYous()
        {
            return await thankYouService.GetThankYous();
        }
    }
}

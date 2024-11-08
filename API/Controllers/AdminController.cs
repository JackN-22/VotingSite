using API.Data;
using API.Entites;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController(IThankYouService thankYouService) : BaseController
    {
        [HttpGet("thankyous")]
        public async Task<IEnumerable<ThankYous?>> ThankYouData() 
        {
            var thankYous = await thankYouService.GetThankYous() ?? throw new Exception("No thankyous to show");
            
            return thankYous;
        }
    }
}

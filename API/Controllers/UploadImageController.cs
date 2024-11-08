using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadImageController : BaseController
    {
        [HttpPost]
        public async Task<string[]> Upload() 
        {
            var connectionString = "DefaultEndpointsProtocol=https;AccountName=todolistapp;AccountKey=PDJM7fF1JS92zSDLLI4ijIfAeC//LG55GbrPEUqvk4AjVGNHJMCZSjHJlGuCrQAPy3d8SbHzyaux+ASt/MmiyQ==;EndpointSuffix=core.windows.net";
            var blobClient = new BlobContainerClient(connectionString, "images");

            var form = await Request.ReadFormAsync();

            var tasks = form.Files.Select( async x => {
                var blob = blobClient.GetBlobClient(x.FileName);
                await blob.UploadAsync(x.OpenReadStream());
                return blob.Uri.ToString();
            });

            return await Task.WhenAll(tasks);
        }
    }
}

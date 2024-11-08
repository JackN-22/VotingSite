using API.Entites;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public async Task<string> CreateToken(AppUser appUser)
    {
        // Retrieve token key from configuration
        var tokenKey = _config["TokenKey"] ?? throw new Exception("Cannot access tokenKey from appsettings");

        // Ensure the token key is sufficiently long
        if (tokenKey.Length < 64) throw new Exception("Your tokenKey needs to be longer");

        // Create a symmetric security key
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        // Ensure the username is not null
        if (string.IsNullOrEmpty(appUser.UserName)) throw new Exception("Null or empty username");

        // Define claims
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, appUser.Id.ToString()),
            new(ClaimTypes.Name, appUser.UserName),
        };


        // Define signing credentials
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Define the token descriptor
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(1), // Token expiration
            SigningCredentials = creds
        };

        // Create the token handler and generate the token
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        // Return the token as a string
        return tokenHandler.WriteToken(token);
    }
}

using System;
using Microsoft.AspNetCore.Identity;

namespace API.Entites;

public class AppUser : IdentityUser
{
    public required string Name { get; set; }
    public required string JobTitle { get; set; }
    public int StVoteCount { get; set; }
    public string? PhotoUrl { get; set; }
}

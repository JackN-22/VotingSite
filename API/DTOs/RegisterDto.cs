using System;

namespace API.DTOs;

public class RegisterDto
{
    public required string Name { get; set; }
    public required string Username { get; set; }
    public required string JobTitle { get; set; }
    public string? PhotoUrl { get; set; }
    public required string Password { get; set; }
}

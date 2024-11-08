using System;

namespace API.DTOs;

public class UserDto
{
    public required string Name { get; set; }
    public required string Username { get; set; }
    public required string JobTitle { get; set; }
    public int StVoteCount { get; set; }
    public string? PhotoUrl { get; set; }
    public required string Token { get; set; }
}

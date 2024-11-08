using System;

namespace API.DTOs;

public class ThankYousDto
{
    public int Id { get; set; }
    public required string Voter { get; set; }
    public required string Nominee { get; set; }
    public required string Reason { get; set; }
}

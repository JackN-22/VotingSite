using System;
using API.DTOs;
using API.Entites;
using API.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ThankYouRepositary(DataContext context) : IThankYouService
{
    public async Task<IEnumerable<ThankYous?>> GetThankYous()
    {
        return await context.ThankYous.ToListAsync();
    }

    public async Task<ThankYous?> SubmitThankYous(ThankYousDto thankYousDto)
    {
        var newThankYou = new ThankYous
        {
            Id = thankYousDto.Id,
            Voter = thankYousDto.Voter,
            Nominee = thankYousDto.Nominee,
            Reason = thankYousDto.Reason
        };

        context.ThankYous.Add(newThankYou);

        if (newThankYou == null) throw new Exception("Fill in all fields");

        var success = await context.SaveChangesAsync() > 0;

        return success ? newThankYou : null;
    }
}

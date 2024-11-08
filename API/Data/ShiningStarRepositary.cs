using System;
using API.Entites;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ShiningStarRepositary(DataContext context) : IShiningStarService
{
    public async Task<IEnumerable<AppUser>> GetUsers()
    {   
        return await context.AppUsers.ToListAsync();
    }

    public async Task<AppUser?> SubmitShiningStar(string username)
    {
        var user = await context.AppUsers.FirstOrDefaultAsync(x => x.UserName == username) ?? throw new Exception("user is null");

        user.StVoteCount += 1;
        
        var success = await context.SaveChangesAsync() > 0;

        return success ? user : null;
    }
}

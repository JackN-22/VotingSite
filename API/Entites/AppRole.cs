using System;
using Microsoft.AspNetCore.Identity;

namespace API.Entites;

public class AppRole : IdentityRole<int>
{
    public ICollection<AppUser> Roles = [];
}

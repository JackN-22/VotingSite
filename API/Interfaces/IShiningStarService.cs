using API.Entites;

namespace API.Interfaces;

public interface IShiningStarService
{
    Task<AppUser?> SubmitShiningStar(string username);
    Task<IEnumerable<AppUser>> GetUsers();
}

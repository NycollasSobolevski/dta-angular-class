using rPlace.Models;

namespace rPlace.Services;

public interface IUserService
{
    public Task Subscribe(User user);
    public Task<string> Login(User user);
}
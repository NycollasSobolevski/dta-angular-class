using MongoDB.Driver;
using rPlace.Models;
using rPlace.Services;

namespace rPlace.UseCases;

public class LoginUseCase(
    IMongoDatabase _mongoDatabase,
    IPasswordService passwordService,
    IJWTService jwtService
)
{
    private readonly IMongoCollection<User> collection = _mongoDatabase.GetCollection<User>("User");
    
    public async Task<string> Login(User payload)
    {
        var cursor = await collection.FindAsync(u => u.Username == payload.Username || u.Email == payload.Email)
            ?? throw new Exception("User or Password not match");

        var user = cursor.First() ?? throw new Exception("User or Password not match");
        bool passwordMatch = passwordService.Compare(payload.Password, user.Password);

        if(!passwordMatch) throw new Exception("User or Password not match");

        var token = jwtService.CreateToken(new()
        {
            ID = user.Id.ToString(),
            Username = user.Username
        }) ;

        return token;
    }

}
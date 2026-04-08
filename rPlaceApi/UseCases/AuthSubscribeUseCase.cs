using System.ComponentModel.DataAnnotations;
using MongoDB.Driver;
using rPlace.Models;
using rPlace.Services;

namespace rPlace.UseCases;

public class SubscribeUseCase
(
    IMongoDatabase _database,
    IPasswordService passwordService
)
{
    private readonly IMongoCollection<User> UserCollection = _database.GetCollection<User>("User");

    public async Task CreateUser(User payload)
    {
        // payload.Id = Guid.NewGuid().ToString();
        payload.Password = passwordService.Hash(payload.Password);
        await UserCollection.InsertOneAsync(payload);
    }
}


public record SubscribePayload
{
    [Required]
    public string Username { get; set; }
    [Required]
    [MinLength(8)]
    public string Password { get; set; }
}

public record SubscribeResponse;
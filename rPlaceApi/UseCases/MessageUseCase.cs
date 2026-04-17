using MongoDB.Driver;
using rPlace.Models;
using rPlace.Services;

namespace rPlace.UseCases;

public class MessageUseCase(
    IMongoDatabase _db,
    IJWTService jWTService
)
{
    private readonly IMongoCollection<Message> MessagesCollection = _db.GetCollection<Message>("Message");

    public async Task SaveMessage(SendMessagePayload body, string token)
    {
        var userExists = await jWTService.GetUserByJwt(token)
            ?? throw new Exception("O usuário não existe");
            
        var toInserted = new Message()
        {
            MessageContent = body.Message,
            Receiver = body.Receiver,
            Sender = new()
            {
                Id = userExists.Id,
                Username = userExists.Username
            }
        };
        await MessagesCollection.InsertOneAsync(toInserted);
    }

    public async Task<IEnumerable<Message>> GetAllUserMessages(string token)
    {
        var userExists = await jWTService.GetUserByJwt(token)
            ?? throw new Exception("O usuário não existe");
        
        var messages = await MessagesCollection.Find(message => 
            message.Sender.Id == userExists.Id 
            || message.Receiver.Id == userExists.Id).ToListAsync();

        return messages;
    }

    public async Task<IEnumerable<Message>> GetChatMessages(string userChatId, string token)
    {
        var userExists = await jWTService.GetUserByJwt(token)
            ?? throw new Exception("O usuário não existe");
        
        var messages = await MessagesCollection.Find(message => 
            message.Sender.Id == userChatId
            || message.Sender.Id == userExists.Id
            || message.Receiver.Id == userChatId
            || message.Receiver.Id == userExists.Id
            ).ToListAsync();

        return messages;
    }
}


public record SendMessagePayload
{
    public UserDto Receiver { get; set; }
    public string Message { get; set; }
}
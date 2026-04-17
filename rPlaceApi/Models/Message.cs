using MongoDB.Bson.Serialization.Attributes;

namespace rPlace.Models;

public record Message
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }
    public UserDto Sender { get; set; }
    public UserDto Receiver { get; set; }
    public string MessageContent { get; set; }
}
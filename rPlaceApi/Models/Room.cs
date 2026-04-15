using MongoDB.Bson.Serialization.Attributes;

namespace rPlace.Models;

public class Room
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }
    public string Name { get; set; }
    public IEnumerable<User> Players { get; set; } = [];
    public IEnumerable<Pixel> Pixels { get; set; } = [];
    public UserDto? CreatedBy { get; set; }
}
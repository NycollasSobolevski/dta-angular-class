using MongoDB.Bson.Serialization.Attributes;

namespace rPlace.Models;

public class Pixel
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }
    public string? IdRoom { get; set; }
    public int X { get; set; }
    public int Y { get; set; }

    [BsonRepresentation(MongoDB.Bson.BsonType.DateTime)]
    public DateTime LastChange { get; set; }
    public string Color { get; set; }
    public UserDto? User { get; set; }
    
}
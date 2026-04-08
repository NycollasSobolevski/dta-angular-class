using MongoDB.Bson.Serialization.Attributes;

namespace rPlace.Models;

public class Room
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string id { get; set; }
    public string Name { get; set; }
    public IEnumerable<Pixel> Pixels { get; set; } = [];
}
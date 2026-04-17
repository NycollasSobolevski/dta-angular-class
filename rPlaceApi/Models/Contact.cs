using MongoDB.Bson.Serialization.Attributes;

namespace rPlace.Models;

public record Contact
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }
    public string Username { get; set; } // nome que irá aparecer para o usuário
    public string ContactId { get; set; }
    public string Phone { get; set; } // phone do contato
    public UserDto User { get; set; } // usuário principal que quer os contatos
}

public record CreateContactPayload
{
    public string Phone {get;set;} 
    public string Username {get;set;} 
}
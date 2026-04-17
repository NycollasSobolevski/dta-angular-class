using MongoDB.Driver;
using rPlace.Models;
using rPlace.Services;

namespace rPlace.UseCases;

public class ContactUseCase(
    IJWTService jwtService,
    IMongoDatabase _db
){
    protected readonly IMongoCollection<Contact> ContactCollection = _db.GetCollection<Contact>("Contact");
    protected readonly IMongoCollection<User> UserCollection = _db.GetCollection<User>("User");

    public async Task<IEnumerable<Contact>> GetAllContacts(string token)
    {
        var user = await jwtService.GetUserByJwt(token) 
            ?? throw new Exception("not found user!");

        var contacts = await ContactCollection
            .Find(c => c.User.Id == user.Id)
            .ToListAsync();

        return contacts;
    }

    public async Task CreateContact(string token, CreateContactPayload payload)
    {
        var user = await jwtService.GetUserByJwt(token) 
            ?? throw new Exception("not found user!");

        var contactUser = await this.UserCollection
            .Find(user => user.Phone == payload.Phone)
            .FirstOrDefaultAsync()
                ?? throw new Exception("Phone number not found");

        Contact contact = new()
        {
            ContactId = contactUser.Id,
            Phone = payload.Phone,
            User = new()
            {
                Id = user.Id,
                Username = user.Username
            },
            Username = payload.Username
        };

        await this.ContactCollection.InsertOneAsync(contact);
    }
}
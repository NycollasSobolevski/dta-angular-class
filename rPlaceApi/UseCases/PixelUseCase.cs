using MongoDB.Driver;
using rPlace.Models;
using rPlace.Services;

namespace rPlace.UseCases;

public class PixelUseCase( 
    IMongoDatabase _db, 
    IJWTService jWTService
)
{
    private readonly IMongoCollection<Pixel> PixelsCollection = _db.GetCollection<Pixel>("Pixel");
    private readonly IMongoCollection<User> UsersCollection = _db.GetCollection<User>("User");

    public async Task<IEnumerable<Pixel>> GetAll()
        => await PixelsCollection.Find(_ => true ).ToListAsync();


    public async Task Update(Pixel pixel, string jwt)
    {
        var tokenContent = jWTService.Deserialize(jwt).Item1;

        if(tokenContent.ID == "" || tokenContent.Username == "")
            throw new Exception("Invalid token");

        var userCollection = UsersCollection.Find(u => u.Id == tokenContent.ID);
        var user = await userCollection.FirstOrDefaultAsync()
            ?? throw new Exception("User token not exists");

        var pixelExists = await PixelsCollection.Find(p => 
                p.Id == pixel.Id 
                || (p.X == pixel.X && p.Y == pixel.Y)
            ).FirstOrDefaultAsync();
        pixel.User = new()
        {
            Id = user.Id,
            Username = user.Username
        };
        pixel.LastChange = DateTime.UtcNow;
        if(pixelExists is not null)
        {
            pixel.Id = pixelExists.Id;
            var updated = await PixelsCollection.ReplaceOneAsync(p => p.Id == pixelExists.Id, pixel);
            if(!updated.IsAcknowledged && updated.ModifiedCount == 0)
                throw new Exception("Error on update pixel");
        } else
            await PixelsCollection.InsertOneAsync(pixel);

    }
}
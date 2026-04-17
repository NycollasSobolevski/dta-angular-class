using rPlace.Models;

namespace rPlace.Services;

public interface IJWTService
{
    string CreateToken(JWTData data);
    (JWTData, bool) Deserialize(string token );
    Task<User> GetUserByJwt(string token);
}

public record JWTData
{
    public string ID { get; set; }
    public string Username { get; set; }
}
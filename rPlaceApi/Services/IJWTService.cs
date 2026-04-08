using rPlace.Models;

namespace rPlace.Services;

public interface IJWTService
{
    string CreateToken(JWTData data);
}

public record JWTData
{
    public string ID { get; set; }
    public string Username { get; set; }
}
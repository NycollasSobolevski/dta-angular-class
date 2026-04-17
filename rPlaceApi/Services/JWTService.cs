using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using rPlace.Models;

namespace rPlace.Services;

public class JWTService(IMongoDatabase _db) : IJWTService
{

    private readonly IMongoCollection<User> UserCollection = _db.GetCollection<User>("User");
    public string CreateToken(JWTData data)
    {
        var secret = "ff2bdd59a0cd9b5553047ad1838001580197a2ee1c43e4c32f745bb71d84997e";
        var keyBytes = Encoding.UTF8.GetBytes(secret);
        var key = new SymmetricSecurityKey(keyBytes);

        var jwt = new JwtSecurityToken(
            issuer: null,
            audience: null,
            claims: [
                new Claim(ClaimTypes.NameIdentifier, data.ID),
                new Claim(ClaimTypes.Name, data.Username)
            ],
            expires: DateTime.UtcNow.AddHours(4),
            signingCredentials: new(
                key,
                SecurityAlgorithms.HmacSha256Signature
            ),
            notBefore: null
        );

        var handler = new JwtSecurityTokenHandler();
        return handler.WriteToken(jwt);
    }

    public (JWTData, bool) Deserialize (string token )
    {
        var handler = new JwtSecurityTokenHandler();
        var data = handler.ReadJwtToken(token);
        var claims = data.Claims;
        var tokenContent = new JWTData()
        {
            ID = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ?? "",
            Username = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value ?? "",
        };

        //! Poderia ter uma validaçao aqui para verificar se o token é valido

        return (tokenContent, true);
    }

    public async Task<User> GetUserByJwt(string token)
    {
        var jwtdata = Deserialize(token).Item1;

        var userData = await UserCollection.Find(users => users.Id == jwtdata.ID).FirstOrDefaultAsync()
            ?? throw new Exception("User not found");

        return userData;
    }

}
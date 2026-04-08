using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace rPlace.Services;

public class JWTService : IJWTService
{
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
}
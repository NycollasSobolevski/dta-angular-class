using Microsoft.AspNetCore.Identity;

namespace rPlace.Services;

public class PasswordService : IPasswordService
{
    readonly PasswordHasher<string> hasher = new();

    public bool Compare(string password, string hash)
    {
        var result = hasher.VerifyHashedPassword(password, hash, password);
        return result == PasswordVerificationResult.Success;
    }

    public string Hash(string content)
        => hasher.HashPassword(content, content);
}
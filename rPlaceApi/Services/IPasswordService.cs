namespace rPlace.Services;

public interface IPasswordService
{
    string Hash(string content);
    bool Compare (string password, string hash);
}

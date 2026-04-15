namespace rPlace.Models;

public record GetAllRoomsResponse
{
    public IEnumerable<GetAllRoomsDTO> Rooms {get;set;}
}

public record GetAllRoomsDTO
{
    public string? Id {get;set;}
    public string Name {get;set;}
    public int? currentPlayers {get;set;}

}
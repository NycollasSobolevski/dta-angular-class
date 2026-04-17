using System.Collections.Concurrent;
using System.Diagnostics;
using System.Net.WebSockets;
using System.Text.Json;
using MongoDB.Driver;
using rPlace.Models;
using rPlace.Services;

namespace rPlace.UseCases;

public class RoomUseCase(
    IMongoDatabase _db,
    IJWTService jwtService
)
{
    /// <summary>
    /// Coleçao do banco de dados
    /// </summary>
    protected readonly IMongoCollection<Room> RoomCollection = _db.GetCollection<Room>("Room");
    protected readonly IMongoCollection<Pixel> PixelsCollection = _db.GetCollection<Pixel>("Pixel");
    protected readonly IMongoCollection<User> UserCollection = _db.GetCollection<User>("User");
    /// <summary>
    /// Armazena o id da conexao do usuario e o respectivo socket
    /// </summary>
    protected static ConcurrentDictionary<string, WebSocket> Sockets = new();
    /// <summary>
    /// Armazena o id do usuario e a respectiva conexao
    /// </summary>
    protected static ConcurrentDictionary<string, string> ConnectionToUser = new();
    /// <summary>
    /// Armazena o id da conexao com o id da room
    /// </summary>
    protected static ConcurrentDictionary<string, string> ConnectionToRoom = new();

    public async Task HandleCommunication(WebSocket webSocket, string? token, string roomId)
    {

        var user = await GetUserByJwt(token);

        var connectionId = Guid.NewGuid().ToString();
        Sockets.TryAdd(connectionId, webSocket);
        ConnectionToRoom.TryAdd(connectionId, roomId);
        ConnectionToUser.TryAdd(user.Id, connectionId);

        await AddPlayerToRoomDb(user, roomId);

        var joinMessage = $"The player {user.Username} entrou na sala";
        await BroadcastMessage<string>(roomId, new()
        {
            Type = MessageType.Message,
            Data = joinMessage
        });
        await SendFirstStateOfRoom(roomId, webSocket);

        try
        {
            var buffer = new byte[1024*4];
            var receiveResult = await webSocket.ReceiveAsync(new(buffer), CancellationToken.None);

            // keep the connection while the client not request to quit
            var lastUpdate =  System.Text.Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);
            while(!receiveResult.CloseStatus.HasValue)
            {
                var receivedMessage = System.Text.Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);
                var pixel = JsonSerializer.Deserialize<PixelUpdateDto>(receivedMessage);
    
                if(pixel is not null)
                    await UpdatePixelInRoom(pixel, roomId);

                receiveResult = await webSocket.ReceiveAsync(new(buffer), CancellationToken.None);
            }

        } catch (Exception e)
        {
            System.Console.WriteLine(e);
        } finally
        {
            Sockets.TryRemove(connectionId, out _);
            ConnectionToRoom.TryRemove(connectionId, out _);
            ConnectionToUser.TryRemove(user.Id, out _);

            var leaveMessage = $"The player {user.Username} saiu da sala";
            await BroadcastMessage<string>(roomId, new()
            {
                Type = MessageType.Message,
                Data = leaveMessage
            });

            // Garante que o socket seja fechado corretamente
            if (webSocket.State != System.Net.WebSockets.WebSocketState.Closed)
            {
                await webSocket.CloseAsync(
                    System.Net.WebSockets.WebSocketCloseStatus.NormalClosure, 
                    "Conexão encerrada", 
                    CancellationToken.None);
            }
        }
    }

    /// <summary>
    /// Update pixel inner room
    /// </summary>
    /// <param name="pixel">Pixel that will be updated</param>
    /// <param name="user">User that will be update pixel</param>
    /// <param name="roomId">Room id</param>
    /// <returns></returns>
    protected async Task<Pixel> UpdatePixelInRoom(PixelUpdateDto pixel, string roomId)
    {
        var user = await GetUserByJwt(pixel.UserToken);
        var roomFilter = Builders<Pixel>.Filter.And(
            Builders<Pixel>.Filter.Eq(_pixel => _pixel.IdRoom, roomId),
            Builders<Pixel>.Filter.Eq(_pixel => _pixel.X, pixel.Pixel.X  ),
            Builders<Pixel>.Filter.Eq(_pixel => _pixel.Y, pixel.Pixel.Y  )
        );

        var update = Builders<Pixel>.Update
            .Set(p => p.Color, pixel.Pixel.Color)
            .Set(p => p.User, new UserDto {Id= user.Id, Username = user.Username})
            .Set(p => p.LastChange, DateTime.UtcNow)
            .SetOnInsert(p => p.IdRoom, roomId)
            .SetOnInsert(p => p.X, pixel.Pixel.X)
            .SetOnInsert(p => p.Y, pixel.Pixel.Y);
            
        var updateOptions = new UpdateOptions {IsUpsert = true};

        var result = await PixelsCollection.UpdateOneAsync(roomFilter, update, updateOptions);

        await SendUpdateToPlayers(roomId, new()
        {
            Color = pixel.Pixel.Color,
            Id = pixel.Pixel.Id,
            X = pixel.Pixel.X,
            Y = pixel.Pixel.Y,
            IdRoom = roomId,
            LastChange = DateTime.UtcNow,
            User = new()
            {
                Id = user.Id,
                Username = user.Username
            },
        });

        // if(result.ModifiedCount == 0)
        // {
        //     Pixel _new = new()
        //     {
        //         Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString(),
        //         Color = pixel.Pixel.Color,
        //         LastChange = DateTime.UtcNow,
        //         User = new UserDto {Id= user.Id, Username = user.Username},
        //         X = pixel.Pixel.X,
        //         Y = pixel.Pixel.Y
        //     };

        //     var pushUpdate = Builders<Room>.Update.Push(r => r.Pixels, _new);
        //     var pushFilter = Builders<Room>.Filter.And(
        //         Builders<Room>.Filter.Eq(r => r.Id, roomId),
        //         Builders<Room>.Filter.Not(
        //             Builders<Room>.Filter.ElemMatch(r => r.Pixels, p => p.X == pixel.Pixel.X && p.Y == pixel.Pixel.Y)
        //         )
        //     );

        //     await RoomCollection.UpdateOneAsync(pushFilter, pushUpdate);

        //     await SendUpdateToPlayers(roomId, updated.);
        // }

        return new()
        {
            Color = pixel.Pixel.Color,
            LastChange = DateTime.UtcNow,
            User = new UserDto {Id= user.Id, Username = user.Username},
            X = pixel.Pixel.X,
            Y = pixel.Pixel.Y
        };
    }

    protected async Task AddPlayerToRoomDb(User user, string roomId)
    {
        var room = await RoomCollection.Find(r => r.Id == roomId).FirstOrDefaultAsync()
            ?? throw new Exception("Room not found");
        
        var playerAlreadyExists = room.Players.FirstOrDefault(p => p.Id == user.Id);

        if(playerAlreadyExists is not null)
            return;

        room.Players = room.Players.Append(new()
        {
            Id= user.Id,
            Username = user.Username
        });
        await RoomCollection.ReplaceOneAsync(r => r.Id == roomId ,room);
    }

    protected async Task SendUpdateToPlayers(string idRoom, Pixel udpate)
    {
        var message = new SocketMessage<Pixel>()
        {
            Type = MessageType.PlayerAction,
            Data = udpate
        };
        await BroadcastMessage<Pixel>(idRoom, message);
    }

    protected async Task SendFirstStateOfRoom(string roomId, WebSocket socket)
    {
        var pixels = await PixelsCollection.Find(r => r.IdRoom == roomId).ToListAsync();
        var message = new SocketMessage<IEnumerable<Pixel>>()
        {
            Type = MessageType.FirstConnection,
            Data = pixels
        };
        var roomInfoBytes = System.Text.Encoding.UTF8.GetBytes(
            JsonSerializer.Serialize(message)
        );
        await socket.SendAsync(
            new ArraySegment<byte>(roomInfoBytes),
            WebSocketMessageType.Text,
            true,
            CancellationToken.None
        );
    }

    /// <summary>
    /// Send message to all users in room
    /// </summary>
    /// <param name="roomId">Room id that users is joined</param>
    /// <param name="message">Message to sended to all users in the room</param>
    /// <returns></returns>
    protected async Task BroadcastMessage<T>(string roomId, SocketMessage<T> message)
    {
        var connectedUsers = ConnectionToRoom.Where(room => room.Value == roomId);

        var messageJson = JsonSerializer.Serialize(message).ToString();
        var messageBytes = System.Text.Encoding.UTF8.GetBytes(messageJson);

        foreach(var pair in connectedUsers)
        {
            var connectionId = pair.Key;

            if(Sockets.TryGetValue(connectionId, out var targetSocket))
            {
                if(targetSocket.State == WebSocketState.Open)
                {
                    await targetSocket.SendAsync(
                        new ArraySegment<byte>(messageBytes),
                        WebSocketMessageType.Text,
                        true,
                        CancellationToken.None
                    );
                }
            }
        }
    }

    protected async Task<User> GetUserByJwt(string token)
    {
        var jwtdata = jwtService.Deserialize(token).Item1;

        var userData = await UserCollection.Find(users => users.Id == jwtdata.ID).FirstOrDefaultAsync()
            ?? throw new Exception("User not found");

        return userData;
    }

    public async Task<GetAllRoomsResponse> GetAllRooms(string token)
    {
        await GetUserByJwt(token);

        var collection = await RoomCollection.Find(r => r.Id != null).ToListAsync()
            ?? throw new Exception("The database has no rooms yet");

        return new()
        {
            Rooms = collection.Select(room =>
                {
                    return new GetAllRoomsDTO()
                    {
                        currentPlayers = room.Players.Count(),
                        Id = room.Id,
                        Name = room.Name
                    };
                })
        };
    }

    public async Task CreateRoom(GetAllRoomsDTO roomData, string token)
    {
        var userData = await GetUserByJwt(token) ?? throw new Exception("Unauthorized user");

        Room newRoom = new()
        {
            Name = roomData.Name,
            Pixels = [],
            Players = [],
            CreatedBy = new()
            {
                Id = userData.Id,
                Username = userData.Username
            }
        };
        await RoomCollection.InsertOneAsync(newRoom);
    }
}

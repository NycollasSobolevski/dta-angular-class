namespace rPlace.Models;

public record SocketMessage<T>
{
    public MessageType Type { get; set; }
    public T Data { get; set; }
}

public enum MessageType
{
    Message,
    PlayerAction,
    FirstConnection
}
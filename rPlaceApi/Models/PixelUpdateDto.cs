namespace rPlace.Models;

public record PixelUpdateDto
{
    public Pixel Pixel { get; set; }
    public string UserToken { get; set; }
}
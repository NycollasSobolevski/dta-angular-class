namespace rPlace.Models;

public class Pixel
{
    public int Id { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public string Color { get; set; }
    public User? User { get; set; }
    
}
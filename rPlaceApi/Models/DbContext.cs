using Microsoft.EntityFrameworkCore;

namespace rPlace.Models;

public class RPlaceDbContext(DbContextOptions options) : DbContext
{
    public DbSet<User> users => Set<User>();
    public DbSet<Pixel> pixels => Set<Pixel>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<User>()
            .HasMany(u => u.Pixels).WithOne(p => p.User);
        
        modelBuilder.Entity<Pixel>()
            .HasOne(p => p.User).WithMany(u => u.Pixels);
    }
}

using Microsoft.EntityFrameworkCore;

namespace CitadelPaintCatalog.Models
{
    // Handles database access for the paint catalog
    public class PaintContext : DbContext
    {
        // Receive database settings from Program.cs
        public PaintContext(DbContextOptions<PaintContext> options)
            : base(options)
        {
        }

        // Collection of paints stored in the database
        public DbSet<Paint> Paints { get; set; } = null!;
    }
}

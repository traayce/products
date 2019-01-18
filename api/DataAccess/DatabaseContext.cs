using DataEntities.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() : base() { }
        public DatabaseContext (DbContextOptions<DatabaseContext> options) : base(options){ }
        public DbSet<ProductEntity> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ProductEntity>()
                .HasIndex(u => u.Code)
                .IsUnique();
        }
    }
}
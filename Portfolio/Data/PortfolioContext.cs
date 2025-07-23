using Microsoft.EntityFrameworkCore;
using Portfolio.Entities;

namespace Portfolio.Data
{
    public class PortfolioContext : DbContext
    {
        public PortfolioContext(DbContextOptions<PortfolioContext> options)
            : base(options)
        {
        }

        public DbSet<Progetto> Progetti { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Progetto>().ToTable("Progetti");
        }
    }
}

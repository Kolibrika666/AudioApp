using AudioApp.Model;
using Microsoft.EntityFrameworkCore;

namespace AudioApp.DAL
{
    public class AudioAppContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;


        public AudioAppContext(DbContextOptions<AudioAppContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
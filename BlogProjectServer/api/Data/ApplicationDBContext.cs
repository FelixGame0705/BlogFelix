using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> dbContextOptions) : base(dbContextOptions)
        {
        }


        public DbSet<Post> Posts { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Interaction> Interactions { get; set; }
        public DbSet<PostAuthor> PostAuthors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Ensure Identity configuration is not overwritten

            // Configure many-to-many relationship using the PostAuthor table
            modelBuilder.Entity<PostAuthor>()
                .HasKey(pa => new { pa.PostID, pa.AppUserID });

            modelBuilder.Entity<PostAuthor>()
                .HasOne(pa => pa.Post)
                .WithMany(p => p.PostAuthors)
                .HasForeignKey(pa => pa.PostID);

            modelBuilder.Entity<PostAuthor>()
                .HasOne(pa => pa.AppUser)
                .WithMany(u => u.PostAuthors)
                .HasForeignKey(pa => pa.AppUserID)
                .OnDelete(DeleteBehavior.Restrict); // Optional: Configure delete behavior if needed

            // Configure Post - Comment relationship
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithOne(c => c.Post)
                .HasForeignKey(c => c.PostID);

            // Configure AppUser - Comment relationship
            modelBuilder.Entity<AppUser>()
                .HasMany(u => u.Comments)
                .WithOne(c => c.AppUser)
                .HasForeignKey(c => c.AppUserID);

            // Configure Post - Interaction relationship
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Interactions)
                .WithOne(i => i.Post)
                .HasForeignKey(i => i.PostID);

            // Configure AppUser - Interaction relationship
            modelBuilder.Entity<AppUser>()
                .HasMany(u => u.Interactions)
                .WithOne(i => i.AppUser)
                .HasForeignKey(i => i.AppUserID);

            // Seed Identity roles
            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "AppUser", NormalizedName = "APPUSER" }
            );
        }

    }
}
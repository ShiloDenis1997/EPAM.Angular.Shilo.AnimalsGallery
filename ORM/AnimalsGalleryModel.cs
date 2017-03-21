namespace ORM
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class AnimalsGalleryModel : DbContext
    {
        public AnimalsGalleryModel()
            : base("name=AnimalsGalleryConnection")
        {
        }

        public virtual DbSet<Albums> Albums { get; set; }
        public virtual DbSet<Images> Images { get; set; }
        public virtual DbSet<Pictures> Pictures { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Albums>()
                .HasMany(e => e.Images)
                .WithRequired(e => e.Albums)
                .HasForeignKey(e => e.AlbumId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Pictures>()
                .HasMany(e => e.Images)
                .WithRequired(e => e.Pictures)
                .HasForeignKey(e => e.PictureId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Roles>()
                .HasMany(e => e.Users)
                .WithRequired(e => e.Roles)
                .HasForeignKey(e => e.RoleId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Users>()
                .HasMany(e => e.Albums)
                .WithRequired(e => e.Users)
                .HasForeignKey(e => e.UserId)
                .WillCascadeOnDelete(false);
        }
    }
}

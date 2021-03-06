namespace ORM
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class AnimalGallery : DbContext
    {
        public AnimalGallery()
            : base("name=AnimalGallery")
        {
        }

        public virtual DbSet<Album> Albums { get; set; }
        public virtual DbSet<ImageFormat> ImageFormats { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<Picture> Pictures { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Term> Terms { get; set; }
        public virtual DbSet<TextPart> TextParts { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Album>()
                .HasMany(e => e.Images)
                .WithRequired(e => e.Album)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ImageFormat>()
                .HasMany(e => e.Images)
                .WithRequired(e => e.ImageFormat)
                .HasForeignKey(e => e.FormatId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Image>()
                .Property(e => e.Cost)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Picture>()
                .HasMany(e => e.Images)
                .WithRequired(e => e.Picture)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Role>()
                .HasMany(e => e.Users)
                .WithRequired(e => e.Role)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Albums)
                .WithRequired(e => e.User)
                .WillCascadeOnDelete(false);
        }
    }
}

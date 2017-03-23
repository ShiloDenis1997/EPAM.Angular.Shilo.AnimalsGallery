namespace ORM
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Image
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public int AlbumId { get; set; }

        public int PictureId { get; set; }

        public bool IsApproved { get; set; }

        public bool IsToSalary { get; set; }

        public decimal Cost { get; set; }

        public int? FormatId { get; set; }

        public virtual Album Album { get; set; }

        public virtual ImageFormat ImageFormat { get; set; }

        public virtual Picture Picture { get; set; }
    }
}

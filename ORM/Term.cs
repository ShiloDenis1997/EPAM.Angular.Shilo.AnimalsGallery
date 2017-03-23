namespace ORM
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Term
    {
        public int Id { get; set; }

        [Column("Term")]
        [Required]
        [StringLength(50)]
        public string Term1 { get; set; }

        [Required]
        [StringLength(500)]
        public string Definition { get; set; }
    }
}

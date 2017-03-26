namespace ORM
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class TextPart
    {
        [Key]
        [StringLength(30)]
        public string Name { get; set; }

        [Required]
        public string TextValue { get; set; }
    }
}

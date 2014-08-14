using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class Dados
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Evento Evento { get; set; }
        public Atleta Atleta { get; set; }
        public string Largada { get; set; }
        public string ChipLargada { get; set; }
        public string Split1 { get; set; }
        public string Split2 { get; set; }
        public string Split3 { get; set; }
        public string Split4 { get; set; }
        public string Split5 { get; set; }
        public string Split6 { get; set; }
        public string Split7 { get; set; }
        public string Split8 { get; set; }
        public string Split9 { get; set; }
        public string Split10 { get; set; }
        public string Adjustment { get; set; }
        public string Chegada { get; set; }
        public string Total { get; set; }
    }
}

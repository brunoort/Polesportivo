using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class EventoModalidade
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Evento Evento { get; set; }
        public string Tipo { get; set; }
        public string Descricao { get; set; }
        public int Campo1 { get; set; }
        public int Campo2 { get; set; }
    }
}

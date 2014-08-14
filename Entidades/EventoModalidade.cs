using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    class EventoModalidade
    {
        public int Id { get; set; }
        public int IdEvento { get; set; }
        public string Tipo { get; set; }
        public string Descricao { get; set; }
        public int Campo1 { get; set; }
        public int Campo2 { get; set; }
    }
}

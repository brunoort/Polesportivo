using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    class Dados
    {
        public int Id { get; set; }
        public int IdEvento { get; set; }
        public int IdAtleta { get; set; }
        public TimeSpan Largada { get; set; }
        public TimeSpan ChipLargada { get; set; }
        public TimeSpan Split1 { get; set; }
        public TimeSpan Split2 { get; set; }
        public TimeSpan Split3 { get; set; }
        public TimeSpan Split4 { get; set; }
        public TimeSpan Split5 { get; set; }
        public TimeSpan Split6 { get; set; }
        public TimeSpan Split7 { get; set; }
        public TimeSpan Split8 { get; set; }
        public TimeSpan Split9 { get; set; }
        public TimeSpan Split10 { get; set; }
        public TimeSpan Adjustment { get; set; }
        public TimeSpan Chegada { get; set; }
        public TimeSpan Total { get; set; }
    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Consultant
    {
        public int Id { get; set; }
        public required string Nume { get; set; }

        public required string Prenume { get; set; }


        public required string Descriere { get; set; }

        public required string ImageUrl { get; set; }


        public required string Link { get; set; }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class CleanNewsDto
    {  
        public required string Id{ get; set;}
        public required string Source { get; set; }
        public required string Title { get; set; }

        public required string Description { get; set; }

        public required string ImageUrl { get; set; }

        public required string Link { get; set; }
    }
}
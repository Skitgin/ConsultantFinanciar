using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class ConsultantsController(ReviewContext context) : Controller
    {
        [HttpGet]
        public async Task<ActionResult<List<Consultant>>> GetReviews()
        {
            return await context.Consultants.ToListAsync();
        }

    }
}
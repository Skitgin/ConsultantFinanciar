using System.Net.Http.Headers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController(ReviewContext context) : ControllerBase
    {


        [HttpGet]
        public async Task<ActionResult<List<Review>>> GetReviews()
        {
            return await context.Reviews.OrderByDescending(x => x.Id).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Review>> PostProduct([FromBody] Review review)
        {
            context.Reviews.Add(review);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetReviews), new { id = review.Id }, review);
            // return Ok(review);
        }
    }
}

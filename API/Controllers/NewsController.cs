using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
namespace API.Controllers
{
    [Route("api/[controller]")]
    public class NewsController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> GetNews()
        {
            string apiKey = "pub_178496cc09344b51aa05b5dde1e6237f";
            string url = $"https://newsdata.io/api/1/latest? apikey={apiKey} &country=ro&image=1&domainurl=www.zf.ro";
            using var client = new HttpClient();
            var response = await client.GetFromJsonAsync<dynamic>(url);
            var results = new List<CleanNewsDto>();
            if (response is null || response is JsonElement { ValueKind: JsonValueKind.Null })
            {
                return NotFound("API Response is null.");
            }
            if (response is JsonElement element && element.TryGetProperty("results", out var resultsElements))
            {
                foreach (var item in resultsElements.EnumerateArray())
                {
                    results.Add(new CleanNewsDto
                    {
                        Id = item.GetProperty("article_id").GetString(),
                        Source = item.GetProperty("source_name").GetString(),
                        Title = item.GetProperty("title").GetString(),
                        Description = item.TryGetProperty("description", out var desc) ? desc.GetString() : null,
                        Link = item.GetProperty("link").GetString(),
                        ImageUrl = item.TryGetProperty("image_url", out var img) ? img.GetString() : null,
                    });
                }
            }
            return Ok(results);
        }
    }
}
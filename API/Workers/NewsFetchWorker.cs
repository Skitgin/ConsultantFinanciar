using System.Text.Json;
using API.Data;
using API.Entities;

public class NewsFetchWorker : BackgroundService
{
    private readonly IServiceProvider _services;
    private readonly ILogger<NewsFetchWorker> _logger;
    private readonly IHttpClientFactory _httpClientFactory;

    public NewsFetchWorker(IServiceProvider services, ILogger<NewsFetchWorker> logger, IHttpClientFactory httpClientFactory)
    {
        _services = services;
        _logger = logger;
        _httpClientFactory = httpClientFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("News Fetcher running at: {time}", DateTimeOffset.Now);

            try
            {
                await FetchAndStoreNews();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred fetching news.");
            }

            // Wait for 2 hours
            await Task.Delay(TimeSpan.FromHours(6), stoppingToken);
        }
    }

    private async Task FetchAndStoreNews()
    {
        string apiKey = "pub_9979d3768edc49349a0b23ceb901a10a";
        string url = $"https://newsdata.io/api/1/latest?apikey={apiKey}&country=ro&image=1&domainurl=www.zf.ro";

        using var scope = _services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ReviewContext>(); 
        var client = _httpClientFactory.CreateClient();

        var response = await client.GetFromJsonAsync<JsonElement>(url);

        if (response.TryGetProperty("results", out var resultsElements))
        {
            foreach (var item in resultsElements.EnumerateArray())
            {
                var newsId = item.GetProperty("article_id").GetString();

                // Check if news already exists to avoid duplicates in SQLite
                if (!dbContext.News.Any(n => n.Id == newsId))
                {
                    var stire = new CleanNewsDto
                    {
                        Id = newsId,
                        Source = item.GetProperty("source_name").GetString(),
                        Title = item.GetProperty("title").GetString(),
                        Description = item.TryGetProperty("description", out var desc) ? desc.GetString() : null,
                        Link = item.GetProperty("link").GetString(),
                        ImageUrl = item.TryGetProperty("image_url", out var img) ? img.GetString() : null,
                    };

                    // Map DTO to your Entity and Add
                    dbContext.News.Add(stire);
                }
            }
            await dbContext.SaveChangesAsync();
        }
    }
}
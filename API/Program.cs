using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

/*builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Match your frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});*/



builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ReviewContext>(opt =>
{
    opt.UseSqlite(connectionString);
});
builder.Services.AddHttpClient();
builder.Services.AddHostedService<NewsFetchWorker>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
//remove Cors logic before production 
app.UseRouting();
app.UseCors("MyCorsPolicy");

app.UseAuthorization();

app.MapControllers();
DbInitializer.InitDb(app);

app.Run();

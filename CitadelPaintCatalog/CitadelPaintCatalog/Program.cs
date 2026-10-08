
using Microsoft.EntityFrameworkCore;
using CitadelPaintCatalog.Models;
using CitadelPaintCatalog.Data;

var builder = WebApplication.CreateBuilder(args);

// Set up API controllers
builder.Services.AddControllers();

// Use an in-memory database for the paint catalog
builder.Services.AddDbContext<PaintContext>(options =>
    options.UseInMemoryDatabase("PaintCatalog"));

// Enable Swagger for API testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Load paint data from Excel when the application starts
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider
        .GetRequiredService<PaintContext>();

    var excelPath = Path.Combine(
        app.Environment.ContentRootPath,
        "Data",
        "CitadelAir.xlsx");

    await PaintDataSeeder.SeedAsync(context, excelPath);
}

// Enable Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serve the frontend files
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseAuthorization();

// Map the API routes
app.MapControllers();

app.Run();

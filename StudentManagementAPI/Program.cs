
using Microsoft.EntityFrameworkCore;
using StudentManagementAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Register API controllers
builder.Services.AddControllers();

// 2. Register OpenAPI
builder.Services.AddOpenApi();

// 3. Read connection string from configuration
var connectionString = builder.Configuration
    .GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException(
        "Connection string 'DefaultConnection' not found.");

// 4. Register Entity Framework Core
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// 5. Build application
var app = builder.Build();

// 6. Enable OpenAPI in development
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// 7. Configure HTTP pipeline
app.UseHttpsRedirection();

app.UseAuthorization();

// 8. Map API controllers
app.MapControllers();

// 9. Run application
app.Run();

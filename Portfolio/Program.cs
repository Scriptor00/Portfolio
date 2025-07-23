using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Service;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog();

var logDirectory = @"C:\PortfolioLogs\PortfolioApp";
Directory.CreateDirectory(logDirectory); // crea se non esiste

Log.Logger = new LoggerConfiguration()
    .WriteTo.File(Path.Combine(logDirectory, "log.txt"), rollingInterval: RollingInterval.Day)
    .CreateLogger();


builder.Services.AddDbContext<PortfolioContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PortfolioConnection")));


builder.Services.AddOpenApi();

builder.Services.AddControllers();

builder.Services.AddScoped<IProgettoService, ProgettoService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSerilogRequestLogging();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio API V1");
        c.RoutePrefix = string.Empty; // Set Swagger UI at the app's root
    });    
}

app.UseHttpsRedirection();

app.MapControllers(); 

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

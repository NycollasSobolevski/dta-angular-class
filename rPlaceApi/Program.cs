using Microsoft.Extensions.Options;
using MongoDB.Driver;
using rPlace.Models;
using rPlace.Services;
using rPlace.UseCases;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // A linha chave é esta:
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: "MainPolicy",
            policy =>
            {
                policy
                    .AllowAnyHeader()
                    .AllowAnyOrigin()
                    .AllowAnyMethod();
            }
        );
    }
);

builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings")
);
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});
builder.Services.AddScoped<IMongoDatabase>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.DatabaseName);
});

builder.Services.AddSingleton<IJWTService, JWTService>();
builder.Services.AddSingleton<IPasswordService, PasswordService>();
builder.Services.AddTransient<LoginUseCase>();
builder.Services.AddTransient<SubscribeUseCase>();
builder.Services.AddTransient<PixelUseCase>();


var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseHttpsRedirection();
app.MapControllers();
app.UseCors();
app.Run();

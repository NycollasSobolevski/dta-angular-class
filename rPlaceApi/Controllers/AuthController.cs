using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using rPlace.Models;
using rPlace.UseCases;

namespace rPlace.Controllers;

[Route("/api/auth/")]
[EnableCors("MainPolicy")]
public class AuthController : ControllerBase
{
    
    [HttpPost("subscribe")]
    public async Task<ActionResult> Subscribe(
        [FromBody] User payload,
        [FromServices] SubscribeUseCase usecase
    )
    {
        await usecase.CreateUser(payload);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(
        [FromBody] User payload,
        [FromServices] LoginUseCase usecase
    )
    {
        var token = await usecase.Login(payload);
        return Ok(token);
    }
}
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using rPlace.Models;
using rPlace.UseCases;

namespace rPlace.Controllers;

[Route("/api/[controller]/")]
[EnableCors("MainPolicy")]
public class PixelController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> AddOrUpdatePixel(
        [FromBody] Pixel payload,
        [FromServices] PixelUseCase useCase
    )
    {
        await useCase.Update(payload, Request.Headers.Authorization);       
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult> GetAllPixel(
        [FromServices] PixelUseCase useCase
    )
    {
        var result = await useCase.GetAll();       
        return Ok(result);
    }
}
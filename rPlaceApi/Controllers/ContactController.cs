using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using rPlace.Models;
using rPlace.UseCases;

namespace rPlace.Controllers;

[Route("api/contacts")]
[EnableCors("MainPolicy")]
public class ContactController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> AddContact(
        [FromBody] CreateContactPayload payload,
        [FromServices] ContactUseCase useCase
    )
    {
        string? token = Request.Headers.Authorization;
        if(token is null) return Unauthorized("Usuário inexistente!");

        await useCase.CreateContact(token, payload);
        return Ok();
    }
    [HttpGet]
    public async Task<ActionResult> GetAllContacts(
        [FromServices] ContactUseCase useCase
    )
    {
        string? token = Request.Headers.Authorization;
        if(token is null) return Unauthorized("Usuário inexistente!");

        var res = await useCase.GetAllContacts(token);
        return Ok(res);
    }


}
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using rPlace.Models;
using rPlace.UseCases;

namespace rPlace.Controllers;

[Route("api/messages")]
[EnableCors("MainPolicy")]
public class MessageController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> SendMessage(
        [FromBody] SendMessagePayload body,
        [FromServices] MessageUseCase useCase
    )
    {
        string token = Request.Headers.Authorization;
        if(token is null)
            return Unauthorized("Usuário não autorizado!");
        await useCase.SaveMessage(body, token);
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<Message>> GetAll(
        [FromServices] MessageUseCase useCase 
    )
    {
        string token = Request.Headers.Authorization;
        if(token is null)
            return Unauthorized("Usuário não autorizado!");
        
        var messages = await useCase.GetAllUserMessages(token);
        return Ok(messages);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Message>> GetByChat(
        string id,
        [FromServices] MessageUseCase useCase
    )
    {
        string token = Request.Headers.Authorization;
        if(token is null)
            return Unauthorized("Usuário não autorizado!");
        
        var messages = await useCase.GetChatMessages(id, token);
        return Ok(messages);
    }
}
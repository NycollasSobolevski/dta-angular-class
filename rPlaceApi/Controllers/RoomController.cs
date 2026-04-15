using System.Collections.Concurrent;
using System.Net.WebSockets;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using rPlace.Models;
using rPlace.UseCases;

namespace rPlace.Controllers;

/// <summary>
/// This class is dedicated to a room controller where can be stay all of pixels to the room object
/// when a pixel is updated all clients is updated
/// </summary>
[ApiController]
[Route("api/room")]
[EnableCors("MainPolicy")]
public class RoomController : ControllerBase
{
    [Route("{idRoom}")]
    public async Task Get(
        string idRoom,
        [FromServices] RoomUseCase useCase
    )
    {
        if(HttpContext.WebSockets.IsWebSocketRequest)
        {
            string? token = null;
            try
            {
                if (Request.Query.TryGetValue("token", out var tokenFromQuery))
                    token = tokenFromQuery;                
            } catch (Exception e)
            {
                System.Console.WriteLine(e.Message);
            }


            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            await useCase.HandleCommunication(webSocket, token, idRoom);
        }
    }

    [HttpGet]
    public async Task<ActionResult<GetAllRoomsResponse>> GetAllRooms(
        [FromServices] RoomUseCase useCase
    )
    {
        var token = Request.Headers.Authorization;
        if(string.IsNullOrEmpty(token))
            return Unauthorized();
        var response = await useCase.GetAllRooms(token!);
        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<GetAllRoomsResponse>> CreateRoom(
        [FromBody] GetAllRoomsDTO body,
        [FromServices] RoomUseCase useCase
    )
    {
        var token = Request.Headers.Authorization;
        if(string.IsNullOrEmpty(token))
            return Unauthorized();
        await useCase.CreateRoom(body, token!);
        return Ok();
    }

}
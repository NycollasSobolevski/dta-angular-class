using Microsoft.AspNetCore.Mvc;

namespace rPlace.Controllers;

[Route("")]
public class HelloWorld : ControllerBase
{
    [HttpGet("")]
    public ActionResult VerifyRunning()
    {
        return Ok("Hello, World!");
    }
}
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Pathpilot.Application.Users.Commands.Register;
using Pathpilot.Application.Users.Queries.Login;

namespace Pathpilot.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(
                [FromBody] RegisterUserCommand command,
                CancellationToken cancellationToken)
        {
            await _mediator.Send(command, cancellationToken);

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
                [FromBody] LoginUserQuery query,
                CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(query, cancellationToken);

            if (result.IsError)
            {
                return Unauthorized(result.Errors);
            }

            return Ok(result.Value);
        }

    }
}

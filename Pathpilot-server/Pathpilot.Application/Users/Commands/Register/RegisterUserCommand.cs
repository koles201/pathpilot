using MediatR;

namespace Pathpilot.Application.Users.Commands.Register;

public sealed record RegisterUserCommand(
    string UserName,
    string Email,
    string Password) : IRequest<Guid>;

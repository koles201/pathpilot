using MediatR;
using Pathpilot.Application.Common.Models;

namespace Pathpilot.Application.Users.Queries.Login;
public sealed record LoginUserQuery(
        string Email,
        string Password) : IRequest<ErrorOr<AuthResult>>;

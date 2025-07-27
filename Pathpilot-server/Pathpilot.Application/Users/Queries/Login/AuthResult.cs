namespace Pathpilot.Application.Users.Queries.Login;

public sealed record AuthResult(
        Guid UserId,
        string UserName,
        string Token);

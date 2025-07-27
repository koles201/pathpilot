using MediatR;
using Microsoft.EntityFrameworkCore;
using Pathpilot.Application.Common.Models;
using Pathpilot.Application.Interfaces.Persistence;
using Pathpilot.Application.Interfaces.Security;

namespace Pathpilot.Application.Users.Queries.Login;

internal sealed class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, ErrorOr<AuthResult>>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public LoginUserQueryHandler(IApplicationDbContext dbContext, IJwtTokenGenerator jwtTokenGenerator)
    {
        _dbContext = dbContext;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<ErrorOr<AuthResult>> Handle(LoginUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (user is null)
        {
            return new Error("Auth.InvalidCredentials", "Invalid email or password.");
        }

        var isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

        if (!isPasswordValid)
        {
            return new Error("Auth.InvalidCredentials", "Invalid email or password.");
        }

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthResult(user.Id, user.UserName, token);
    }
}

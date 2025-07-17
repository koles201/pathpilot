using MediatR;
using Microsoft.EntityFrameworkCore;
using Pathpilot.Application.Interfaces.Persistence;
using Pathpilot.Domain.Entities;

namespace Pathpilot.Application.Users.Commands.Register;

internal sealed class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand>
{
    private readonly IApplicationDbContext _dbContext;

    public RegisterUserCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var isEmailTaken = await _dbContext.Users
            .AnyAsync(u => u.Email == request.Email, cancellationToken);

        if (isEmailTaken)
        {
            throw new Exception("User with this email already exists.");
        }

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var user = new User
        {
            Id = Guid.NewGuid(),
            UserName = request.UserName,
            Email = request.Email,
            PasswordHash = passwordHash,
            CreatedAt = DateTime.UtcNow
        };

        var defaultRole = await _dbContext.Roles.FindAsync(1);
        if (defaultRole is not null)
        {
            var userRole = new UserRole
            {
                User = user,
                Role = defaultRole
            };

            _dbContext.UserRoles.Add(userRole);
        }

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
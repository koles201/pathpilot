using Pathpilot.Domain.Entities;

namespace Pathpilot.Application.Interfaces.Security;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}

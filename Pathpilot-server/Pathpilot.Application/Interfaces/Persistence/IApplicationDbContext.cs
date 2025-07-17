using Microsoft.EntityFrameworkCore;
using Pathpilot.Domain.Entities;

namespace Pathpilot.Application.Interfaces.Persistence
{
    public interface IApplicationDbContext
    {
        DbSet<User> Users { get; }
        DbSet<Role> Roles { get; }
        DbSet<UserRole> UserRoles { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}

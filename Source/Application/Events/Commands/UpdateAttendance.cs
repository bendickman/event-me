using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(
        IUserAccessor userAccessor,
        AppDbContext context)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(
            Command request,
            CancellationToken cancellationToken)
        {
            var appEvent = await context.Events
                .Include(x => x.Attendees)
                .ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (appEvent is null)
            {
                return Result<Unit>.Failure("Event not found", 404);
            }

            var user = await userAccessor.GetUserAsync();

            var attendance = appEvent.Attendees.FirstOrDefault(x => x.UserId == user.Id);
            var isHost = appEvent.Attendees.Any(x => x.IsHost && x.UserId == user.Id);

            if (attendance != null)
            {
                if (isHost)
                {
                    appEvent.IsCancelled = !appEvent.IsCancelled;
                }
                else
                {
                    appEvent.Attendees.Remove(attendance);
                }
            }
            else
            {
                appEvent.Attendees.Add(new AppEventAttendee
                {
                    UserId = user.Id,
                    AppEventId = appEvent.Id,
                    IsHost = false
                });
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating the DB", 400);
        }
    }
}

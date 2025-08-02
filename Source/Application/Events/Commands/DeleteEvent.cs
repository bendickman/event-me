using Application.Core;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Events.Commands;

public class DeleteEvent
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(
            Command request,
            CancellationToken cancellationToken)
        {
            var appEvent = await context.Events
                .FindAsync([request.Id], cancellationToken);

            if (appEvent is null)
            {
                return Result<Unit>.Failure("Event not found", (int)HttpStatusCode.NotFound);
            }

            context.Remove(appEvent);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
            {
                return Result<Unit>.Failure("Failed to delete the Event", (int)HttpStatusCode.BadRequest);
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}

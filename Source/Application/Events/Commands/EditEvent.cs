using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Events.Commands;

public class EditEvent
{
    public class Command : IRequest<Result<Unit>>
    {
        public required AppEvent AppEvent { get; set; }
    }

    public class Handler(
        AppDbContext context,
        IMapper mapper)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(
            Command request,
            CancellationToken cancellationToken)
        {
            var appEvent = await context.Events
                .FindAsync([request.AppEvent.Id], cancellationToken);

            if (appEvent is null)
            {
                return Result<Unit>.Failure("Event not found", (int)HttpStatusCode.NotFound);
            }

            mapper.Map(request.AppEvent, appEvent);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
            {
                return Result<Unit>.Failure("Failed to update the Event", (int)HttpStatusCode.BadRequest);
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}

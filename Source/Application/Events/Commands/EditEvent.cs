using Application.Core;
using Application.Events.DTOs;
using AutoMapper;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Events.Commands;

public class EditEvent
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditEventDto EditEventDto { get; set; }
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
                .FindAsync([request.EditEventDto.Id], cancellationToken);

            if (appEvent is null)
            {
                return Result<Unit>.Failure("Event not found", (int)HttpStatusCode.NotFound);
            }

            mapper.Map(request.EditEventDto, appEvent);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
            {
                return Result<Unit>.Failure("Failed to update the Event", (int)HttpStatusCode.BadRequest);
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}

using Application.Core;
using Application.Events.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Events.Commands;

public class CreateEvent
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateEventDto EventDto { get; set; }
    }

    public class Handler(
        AppDbContext context,
        IMapper mapper)
        : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(
            Command request,
            CancellationToken cancellationToken)
        {
            var appEvent = mapper.Map<AppEvent>(request.EventDto);

            context.Events.Add(appEvent);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
            {
                return Result<string>.Failure("Failed to create the Event", (int)HttpStatusCode.NotFound);
            }

            return Result<string>.Success(appEvent.Id);
        }
    }
}

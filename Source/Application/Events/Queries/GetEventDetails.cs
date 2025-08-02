using Application.Core;
using Application.Events.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Events.Queries;

public class GetEventDetails
{
    public class Query : IRequest<Result<EventDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(
        AppDbContext context,
        IMapper mapper)
        : IRequestHandler<Query, Result<EventDto>>
    {
        public async Task<Result<EventDto>> Handle(
            Query request,
            CancellationToken cancellationToken)
        {
            var appEvent = await context.Events
                .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

            if (appEvent is null)
            {
                return Result<EventDto>.Failure("Event not found", (int)HttpStatusCode.NotFound);
            }

            return Result<EventDto>.Success(appEvent);
        }
    }
}

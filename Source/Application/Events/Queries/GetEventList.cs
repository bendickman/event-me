using Application.Core;
using Application.Events.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Queries;

public class GetEventList
{
    public class Query : IRequest<Result<PagedList<EventDto, DateTime?>>>
    {
        public required EventParameters Parameters { get; set; }
    }

    public class Handler(
        AppDbContext dbContext,
        IMapper mapper,
        IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<EventDto, DateTime?>>>
    {
        public async Task<Result<PagedList<EventDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = dbContext.Events
                .OrderBy(e => e.Date)
                .Where(e => e.Date >= (request.Parameters.Cursor ?? request.Parameters.StartDate))
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Parameters.Filter))
            {
                query = request.Parameters.Filter switch
                {
                    "isGoing" => query.Where(x =>
                        x.Attendees.Any(a => a.UserId == userAccessor.GetUserId())),
                    "isHost" => query.Where(x =>
                        x.Attendees.Any(a => a.IsHost && a.UserId == userAccessor.GetUserId())),
                    _ => query
                };
            }

            var projectedEvents = query.ProjectTo<EventDto>(mapper.ConfigurationProvider,
                    new { currentUserId = userAccessor.GetUserId() });

            var events = await projectedEvents
                .Take(request.Parameters.PageSize + 1)
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;
            if (events.Count > request.Parameters.PageSize)
            {
                nextCursor = events.Last().Date;
                events.RemoveAt(events.Count - 1);
            }

            return Result<PagedList<EventDto, DateTime?>>.Success(
                new PagedList<EventDto, DateTime?>
                {
                    Items = events,
                    NextCursor = nextCursor,
                }
            );
        }
    }
}

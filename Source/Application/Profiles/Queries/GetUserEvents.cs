using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserEvents
{
    public class Query : IRequest<Result<List<UserEventDto>>>
    {
        public required string UserId { get; set; }

        public required string Filter { get; set; }
    }

    public class Handler(
        AppDbContext context,
        IMapper mapper,
        IDateTimeProvider dateTimeProvider) : IRequestHandler<Query, Result<List<UserEventDto>>>
    {
        public async Task<Result<List<UserEventDto>>> Handle(
            Query request,
            CancellationToken cancellationToken)
        {
            var query = context.AppEventAttendees
                .Where(u => u.User.Id == request.UserId)
                .OrderBy(a => a.AppEvent.Date)
                .Select(x => x.AppEvent)
                .AsQueryable();

            var currentDateTime = dateTimeProvider.UtcNow;

            query = request.Filter switch
            {
                "past" => query.Where(a => a.Date <= currentDateTime
                    && a.Attendees.Any(x => x.UserId == request.UserId)),
                "hosting" => query.Where(a => a.Attendees.Any(x => x.IsHost && x.UserId == request.UserId)),
                _ => query.Where(a => a.Date >= currentDateTime
                    && a.Attendees.Any(x => x.UserId == request.UserId))
            };

            var projectedActivities = query
                .ProjectTo<UserEventDto>(mapper.ConfigurationProvider);

            var activities = await projectedActivities.ToListAsync(cancellationToken);

            return Result<List<UserEventDto>>.Success(activities);
        }
    }
}

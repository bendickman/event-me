using Application.Core;
using Application.Events.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Queries;

public class GetCommentsList
{
    public class Query : IRequest<Result<List<CommentDto>>>
    {
        public required string AppEventId { get; set; }
    }

    public class Handler(
        AppDbContext context,
        IMapper mapper)
        : IRequestHandler<Query, Result<List<CommentDto>>>
    {
        public async Task<Result<List<CommentDto>>> Handle(
            Query request,
            CancellationToken cancellationToken)
        {
            var comments = await context.Comments
                .Where(x => x.AppEventId == request.AppEventId)
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<CommentDto>>.Success(comments);
        }
    }
}

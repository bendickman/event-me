using Application.Core;
using Application.Events.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Commands;

public class CreateComment
{
    public class Command : IRequest<Result<CommentDto>>
    {
        public required string Body { get; set; }

        public required string AppEventId { get; set; }
    }

    public class Handler(
        AppDbContext context,
        IMapper mapper,
        IUserAccessor userAccessor)
        : IRequestHandler<Command, Result<CommentDto>>
    {
        public async Task<Result<CommentDto>> Handle(
            Command request,
            CancellationToken cancellationToken)
        {
            var appEvent = await context.Events
                .Include(x => x.Comments)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.AppEventId, cancellationToken);

            if (appEvent is null)
            {
                return Result<CommentDto>.Failure("Could not find event", 404);
            }

            var user = await userAccessor.GetUserAsync();

            var comment = new Comment
            {
                UserId = user.Id,
                AppEventId = appEvent.Id,
                Body = request.Body
            };

            appEvent.Comments.Add(comment);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<CommentDto>.Success(mapper.Map<CommentDto>(comment))
                : Result<CommentDto>.Failure("Failed to add comment", 400);
        }
    }
}

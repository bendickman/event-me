using Application.Events.Commands;
using Application.Events.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Api.SignalR;

public class CommentHub(IMediator mediator) : Hub
{
    public async Task SendComment(CreateComment.Command command)
    {
        var comment = await mediator.Send(command);

        await Clients.Group(command.AppEventId).SendAsync("ReceiveComment", comment.Value);
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var appEventId = httpContext?.Request.Query["appEventId"];

        if (string.IsNullOrEmpty(appEventId))
        {
            throw new HubException("No event with this id");
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, appEventId!);

        var result = await mediator.Send(new GetCommentsList.Query { AppEventId = appEventId! });

        await Clients.Caller.SendAsync("LoadComments", result.Value);
    }
}

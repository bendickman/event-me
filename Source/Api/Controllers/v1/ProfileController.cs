using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.v1;

public class ProfileController : BaseApiController
{
    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfile>> GetProfile(string userId)
    {
        return HandleResult(await Mediator.Send(new GetProfile.Query { UserId = userId }));
    }

    [HttpPost("{userId}/follow")]
    public async Task<ActionResult> FollowToggle(string userId)
    {
        return HandleResult(await Mediator
            .Send(new FollowToggle.Command { TargetUserId = userId }));
    }

    [HttpGet("{userId}/follow-list")]
    public async Task<ActionResult> GetFollowings(
        string userId,
        string predicate)
    {
        return HandleResult(await Mediator.Send(new GetFollowings.Query
        {
            UserId = userId,
            Predicate = predicate
        }));
    }

    [HttpGet("{userId}/events")]
    public async Task<IActionResult> GetUserEvents(
        string userId,
        string filter)
    {
        return HandleResult(await Mediator.Send(new GetUserEvents.Query
        {
            UserId = userId,
            Filter = filter
        }
        ));
    }
}

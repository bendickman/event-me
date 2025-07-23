using Application.Core;
using Application.Events.DTOs;
using Application.Events.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.v1
{
    public class EventController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<PagedList<EventDto, DateTime?>>> GetEvents(
            [FromQuery] EventParameters eventParameters)
        {
            return HandleResult(await Mediator.Send(new GetEventList.Query { Parameters = eventParameters }));
        }
    }
}

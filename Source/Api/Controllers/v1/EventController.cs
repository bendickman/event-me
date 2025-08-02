using Application.Core;
using Application.Events.Commands;
using Application.Events.DTOs;
using Application.Events.Queries;
using Domain;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> GetEvent(string id)
        {
            return HandleResult(await Mediator.Send(new GetEventDetails.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateEvent(CreateEventDto eventDto)
        {
            return HandleResult(await Mediator.Send(new CreateEvent.Command { EventDto = eventDto }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(string id, AppEvent appEvent)
        {
            appEvent.Id = id;
            return HandleResult(await Mediator.Send(new EditEvent.Command { AppEvent = appEvent }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteEvent.Command { Id = id }));
        }
    }
}

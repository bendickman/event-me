using Application.Core;
using Application.Events.Commands;
using Application.Events.DTOs;
using Application.Events.Queries;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPut]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> EditActivity(EditEventDto editEventDto)
        {
            return HandleResult(await Mediator.Send(new EditEvent.Command { EditEventDto = editEventDto }));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteEvent.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult> Attend(string id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    }
}

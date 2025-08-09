using Application.Events.Commands;
using Application.Events.DTOs;

namespace Application.Events.Validators;

public class CreateEventValidator : BaseEventValidator<CreateEvent.Command, CreateEventDto>
{
    public CreateEventValidator() : base(x => x.EventDto)
    {
    }
}
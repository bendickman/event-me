using Application.Events.Commands;
using Application.Events.DTOs;
using FluentValidation;

namespace Application.Events.Validators;

public class EditEventValidator : BaseEventValidator<EditEvent.Command, EditEventDto>
{
    public EditEventValidator() : base(x => x.EditEventDto)
    {
        RuleFor(x => x.EditEventDto.Id)
            .NotEmpty().WithMessage("Id is required");
    }
}

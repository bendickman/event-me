using Application.Events.DTOs;
using FluentValidation;

namespace Application.Events.Validators;

public class BaseEventValidator<T, TDto> : AbstractValidator<T>
    where TDto : BaseEventDto
{
    public BaseEventValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(100).WithMessage("Title must not exceed 100 characters");

        RuleFor(x => selector(x).Description)
            .NotEmpty().WithMessage("Description is required");

        RuleFor(x => selector(x).Date)
            .GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the future");

        RuleFor(x => selector(x).Category)
            .NotEmpty().WithMessage("Category is required");

        RuleFor(x => selector(x).City)
            .NotEmpty().WithMessage("City is required");

        RuleFor(x => selector(x).Venue)
            .NotEmpty().WithMessage("Venue is required");
    }
}

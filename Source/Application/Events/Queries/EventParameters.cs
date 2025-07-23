using Application.Core;

namespace Application.Events.Queries;

public class EventParameters : PaginationParameters<DateTime?>
{
    public string? Filter { get; set; }

    public DateTime StartDate { get; set; } = DateTime.UtcNow;
}

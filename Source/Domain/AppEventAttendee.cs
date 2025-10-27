namespace Domain;

public class AppEventAttendee
{
    public string? UserId { get; set; }

    public User User { get; set; } = null!;

    public string? AppEventId { get; set; }

    public AppEvent AppEvent { get; set; } = null!;

    public bool IsHost { get; set; }

    public DateTime DateJoined { get; set; } = DateTime.UtcNow;
}

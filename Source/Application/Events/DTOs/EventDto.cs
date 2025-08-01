﻿namespace Application.Events.DTOs;

public class EventDto
{
    public required string Id { get; set; }

    public required string Title { get; set; }

    public DateTime Date { get; set; }

    public required string Description { get; set; }

    public required string Category { get; set; }

    public bool IsCancelled { get; set; }

    public required string HostDisplayName { get; set; }

    public required string HostId { get; set; }

    // location props
    public required string City { get; set; }

    public required string Venue { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }
}

using Application.Events.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        string? currentUserId = null;

        CreateMap<AppEvent, AppEvent>();
        CreateMap<AppEvent, EventDto>();
        CreateMap<CreateEventDto, AppEvent>();
        CreateMap<EditEventDto, AppEvent>();
    }
}

using System;
using API.DTOs;
using API.Entites;
using AutoMapper;

namespace API.Helper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<RegisterDto, AppUser>()
            .ForMember(dest => dest.UserName,
                        opt => opt.MapFrom(src => src.Username))
            .ForMember(dest => dest.JobTitle,
                        opt => opt.MapFrom(src => src.JobTitle));
    }
}

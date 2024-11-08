using System;
using API.DTOs;
using API.Entites;

namespace API.Interfaces;

public interface IThankYouService
{
    Task<ThankYous?> SubmitThankYous(ThankYousDto thankYousDto);
    Task<IEnumerable<ThankYous?>> GetThankYous();
}

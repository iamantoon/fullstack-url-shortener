using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILinkRepository
    {
        void Update(AppLink link);
        Task<bool> SaveAllAsync();
        Task<PagedList<LinkDto>> GetLinksAsync(LinkParams linkParams);
        Task<PagedList<LinkDto>> GetPersonalLinksAsync(LinkParams linkParams, string currentUserEmail);
        Task<LinkDto> GetLinkByIdAsync(int id);
    }
}
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILinkRepository
    {
        void Update(AppLink link);
        Task<bool> SaveAllAsync();
        Task<bool> CreateLink(AppLink link);
        Task<bool> LinkExists(string link);
        Task<PagedList<LinkDto>> GetLinksAsync(LinkParams linkParams);
        Task<PagedList<LinkDto>> GetPersonalLinksAsync(LinkParams linkParams, string currentUserEmail);
        Task DeactivateExpiredLinks();
        Task<LinkDto> GetLinkByIdAsync(int id);
    }
}
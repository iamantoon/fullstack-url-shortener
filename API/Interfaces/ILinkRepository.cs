using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILinkRepository
    {
        Task<PagedList<LinkDto>> GetLinksAsync(LinkParams linkParams);
        Task<PagedList<LinkDto>> GetPersonalLinksAsync(LinkParams linkParams, string currentUserEmail);
        Task<LinkDto> GetLinkByShortCodeAsync(string shortCode);
        Task<AppLink> GetLinkByIdAsync(int id);
        Task<bool> CreateLink(AppLink link);
        Task<bool> DeleteLinkAsync(int id);
        Task<bool> LinkExists(string link, string currentUserEmail);
        Task<bool> IsLinkActive(string link);
        Task IncrementUsageCount(string shortCode);
        Task DeactivateExpiredLinks();
        void Update(AppLink link);
        Task<bool> SaveAllAsync();
    }
}
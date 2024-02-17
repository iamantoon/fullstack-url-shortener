using API.Entities;

namespace API.Interfaces
{
    public interface ILinkRepository
    {
        void Update(AppLink link);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppLink>> GetLinksAsync();
        Task<AppLink> GetLinkByIdAsync(int id);
    }
}
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LinkRepository : ILinkRepository
    {
        private readonly DataContext _context;
        public LinkRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppLink> GetLinkByIdAsync(int id)
        {
            return await _context.Links.FindAsync(id);
        }

        public async Task<IEnumerable<AppLink>> GetLinksAsync()
        {
            return await _context.Links.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppLink link)
        {
            _context.Entry(link).State = EntityState.Modified;
        }
    }
}
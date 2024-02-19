using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using API.Helpers;

namespace API.Data
{
    public class LinkRepository : ILinkRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LinkRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<LinkDto> GetLinkByIdAsync(int id)
        {
            return await _context.Links
                .Where(user => user.Id == id)
                .ProjectTo<LinkDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<LinkDto>> GetLinksAsync(LinkParams linkParams)
        {              
            var query = _context.Links.ProjectTo<LinkDto>(_mapper.ConfigurationProvider).AsNoTracking();
            
            return await PagedList<LinkDto>.CreateAsync(query, linkParams.PageNumber, linkParams.PageSize);
        }

        public async Task<PagedList<LinkDto>> GetPersonalLinksAsync(LinkParams linkParams, string currentUserEmail)
        {
            var query = _context.Links.Where(u => u.AppUser.Email == currentUserEmail).ProjectTo<LinkDto>(_mapper.ConfigurationProvider).AsNoTracking();

            return await PagedList<LinkDto>.CreateAsync(query, linkParams.PageNumber, linkParams.PageSize);
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
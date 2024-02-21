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
            var query = _context.Links.AsQueryable();

            var minExpiryDate = DateTime.Today.AddDays(linkParams.MinExpiryDate);
            var maxExpiryDate = DateTime.Today.AddDays(linkParams.MaxExpiryDate);

            // query = query.Where(l => l.ExpiryDate >= minExpiryDate && l.ExpiryDate <= maxExpiryDate);
            // query = query.Where(u => u.Email != userParams.Email);
            query = linkParams.OrderBy switch
            {
                "oldest" => query.OrderBy(link => link.Created),
                _ => query.OrderByDescending(link => link.Created)
            };
            
            return await PagedList<LinkDto>.CreateAsync(
                query.AsNoTracking().ProjectTo<LinkDto>(_mapper.ConfigurationProvider), 
                linkParams.PageNumber, 
                linkParams.PageSize
            );
        }

        public async Task<PagedList<LinkDto>> GetPersonalLinksAsync(LinkParams linkParams, string currentUserEmail)
        {
            var query = _context.Links.AsQueryable();

            // var minExpiryDate = DateTime.Today.AddDays(linkParams.MinExpiryDate);
            // var maxExpiryDate = DateTime.Today.AddDays(linkParams.MaxExpiryDate);
            
            query = query.Where(u => u.AppUser.Email == currentUserEmail);

            query = linkParams.OrderBy switch
            {
                "oldest" => query.OrderBy(link => link.Created),
                _ => query.OrderByDescending(link => link.Created)
            };

            return await PagedList<LinkDto>.CreateAsync(
                query.ProjectTo<LinkDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                linkParams.PageNumber, 
                linkParams.PageSize
            );
        }

        public async Task<bool> CreateLink(AppLink link)
        {
            _context.Links.Add(link);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> LinkExists(string link)
        {
            return await _context.Links.AnyAsync(l => l.Link == link);
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
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AppUser> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .Include(p => p.Links)
                .SingleOrDefaultAsync(user => user.Email == email);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .Include(p => p.Links)
                .FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Links)
                .ToListAsync();
        }

        public async Task<IEnumerable<UserToReturnDto>> GetUsersToReturnAsync()
        {
            return await _context.Users
                .ProjectTo<UserToReturnDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<UserToReturnDto> GetUserToReturnDtoAsync(int id)
        {
            return await _context.Users
                .Where(user => user.Id == id)
                .ProjectTo<UserToReturnDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserToReturnDto>>> GetUsers()
        {
            var users = await _userRepository.GetUsersToReturnAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserToReturnDto>> GetUserById(int id)
        {
            return await _userRepository.GetUserToReturnDtoAsync(id);
        }
    }
}
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LinksController : BaseApiController
    {
        private readonly ILinkRepository _linkRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public LinksController(ILinkRepository linkRepository, IUserRepository userRepository, IMapper mapper)
        {
            _linkRepository = linkRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinkDto>>> GetLinks()
        {
            var links = await _linkRepository.GetLinksAsync();

            var linksToReturn = _mapper.Map<IEnumerable<LinkDto>>(links);

            return Ok(linksToReturn);
        }

        [Authorize]
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<AppLink>>> GetMyLinks()
        {
            return Ok(await _linkRepository.GetLinksAsync());
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<LinkDto>> GetLink(int id)
        {
            var link = await _linkRepository.GetLinkByIdAsync(id);

            return _mapper.Map<LinkDto>(link);
        }
    }
}
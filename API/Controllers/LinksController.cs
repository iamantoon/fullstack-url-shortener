using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    public class LinksController : BaseApiController
    {
        private readonly ILinkRepository _linkRepository;
        private readonly IUserRepository _userRepository;
        public LinksController(ILinkRepository linkRepository, IUserRepository userRepository)
        {
            _linkRepository = linkRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<LinkDto>>> GetLinks([FromQuery]LinkParams linkParams)
        {
            var links = await _linkRepository.GetLinksAsync(linkParams);

            Response.AddPaginationHeader(new PaginationHeader(links.CurrentPage, links.PageSize, links.TotalCount, links.TotalPages));

            return Ok(links);
        }

        [HttpGet("my")]
        public async Task<ActionResult<PagedList<LinkDto>>> GetMyLinks([FromQuery]LinkParams linkParams)
        {
            var currentUserEmail = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    
            if (currentUserEmail == null)
            {
                return BadRequest("Unable to retrieve current user.");
            }

            return Ok(await _linkRepository.GetPersonalLinksAsync(linkParams, currentUserEmail));
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<LinkDto>> GetLink(int id)
        {
            return await _linkRepository.GetLinkByIdAsync(id);
        }
    }
}
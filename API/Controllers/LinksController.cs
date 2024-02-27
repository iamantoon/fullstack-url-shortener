using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

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
            await _linkRepository.DeactivateExpiredLinks();

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

            var links = await _linkRepository.GetPersonalLinksAsync(linkParams, currentUserEmail);

            Response.AddPaginationHeader(new PaginationHeader(links.CurrentPage, links.PageSize, links.TotalCount, links.TotalPages));

            return Ok(links);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<LinkDto>> GetLink(int id)
        {
            return await _linkRepository.GetLinkByIdAsync(id);
        }
        
        [HttpPost("create")]
        public async Task<ActionResult<LinkDto>> CreateLink(CreateLinkDto createLinkDto)
        {
            var currentUserEmail = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                
            if (currentUserEmail == null)
            {
                return BadRequest("Unable to retrieve current user");
            }

            var currentUser = await _userRepository.GetUserByEmailAsync(currentUserEmail);

            if (await _linkRepository.LinkExists(createLinkDto.Link)) return BadRequest("You have already created this link");

            string shortCode = GenerateShortCode(createLinkDto.Link);

            var link = new AppLink
            {
                ShortLink = shortCode,
                Link = createLinkDto.Link,
                ExpiryDate = Convert.ToDateTime(DateTime.Now.AddHours(createLinkDto.HowManyHoursAccessible)),
                UserId = currentUser.Id,
                AppUser = currentUser,
                Active = true,
                UsageCount = 0
            };

            await _linkRepository.CreateLink(link);
            await _linkRepository.SaveAllAsync();

            return new LinkDto
            {
                Id = link.Id,
                ShortLink = link.ShortLink,
                Link = link.Link,
                Created = link.Created,
                ExpiryDate = DateTime.Now.AddHours(createLinkDto.HowManyHoursAccessible),
                UsageCount = link.UsageCount
            };
        }

        [HttpGet]
        [Route("s/{shortCode}")]
        public async Task<ActionResult> RedirectUrl(string shortCode)
        {
            var url = await _linkRepository.GetLinkByShortCodeAsync(shortCode);
            
            if (url == null || !url.Active) return NotFound("This link does not exist or it has expired");

            await _linkRepository.IncrementUsageCount(shortCode);

            return Redirect(url.Link);
        }

        private string GenerateShortCode(string longUrl)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(longUrl));
                string base64Hash = Convert.ToBase64String(hashBytes);

                base64Hash = base64Hash.Replace('+', '-').Replace('/', '_');

                string alphanumericShortCode = new string(base64Hash.Where(char.IsLetterOrDigit).ToArray());

                return alphanumericShortCode.Substring(0, Math.Min(alphanumericShortCode.Length, 6));
            }
        }
    }
}
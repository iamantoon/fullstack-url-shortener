using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class LinksController : BaseApiController
    {
        private readonly DataContext _context;
        public LinksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppLink>>> GetLinks()
        {
            return await _context.Links.ToListAsync();
        }

        [Authorize]
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<AppLink>>> GetMyLinks()
        {
            return await _context.Links
                // .TakeWhile(link => link.UserId == )
                .ToListAsync();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<AppLink>> GetLink(int id)
        {
            return await _context.Links.FindAsync(id);
        }
    }
}
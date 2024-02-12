using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LinksController : ControllerBase
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

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<AppLink>> GetLink(int id)
        {
            return await _context.Links.FindAsync(id);
        }
    }
}
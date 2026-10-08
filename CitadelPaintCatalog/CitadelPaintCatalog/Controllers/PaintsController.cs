
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CitadelPaintCatalog.Models;

namespace CitadelPaintCatalog.Controllers
{
    // Handles API requests for paint records
    [Route("api/[controller]")]
    [ApiController]
    public class PaintsController : ControllerBase
    {
        private readonly PaintContext _context;

        // Connect the controller to the database
        public PaintsController(PaintContext context)
        {
            _context = context;
        }

        // GET: api/paints - Return all paints sorted by name
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paint>>> GetPaints()
        {
            return await _context.Paints
                .AsNoTracking()
                .OrderBy(p => p.Name)
                .ToListAsync();
        }

        // GET: api/paints/5 - Return one paint by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Paint>> GetPaint(long id)
        {
            var paint = await _context.Paints.FindAsync(id);

            // Return 404 if the paint does not exist
            if (paint == null)
            {
                return NotFound();
            }

            return paint;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bet.Data;
using Bet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataRepository<Event> _repo;

        public EventsController(DataContext context, IDataRepository<Event> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Events
        [HttpGet]
        public IEnumerable<Event> GetEvents()
        {
            return _context.Event.OrderByDescending(e => e.EventId);
        }

        [HttpGet("tournamentevents/{id}")]
        public IEnumerable<Event> GetEventsByTournament([FromRoute] int id)
        {
            var results = _context.Event.Where(e => e.TournamentId == id).OrderByDescending(e => e.EventId);
            return results;
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tEvent = await _context.Event.FindAsync(id);

            if (tEvent == null)
                return NotFound();

            return Ok(tEvent);
        }

        // PUT: api/Events/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent([FromRoute] int id, [FromBody] Event tEvent)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != tEvent.EventId)
                return BadRequest();

            _context.Entry(tEvent).State = EntityState.Modified;

            try
            {
                _repo.Update(tEvent);
                var save = await _repo.SaveAsync(tEvent);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/Events
        [HttpPost]
        public async Task<IActionResult> PostEvent([FromBody] Event tEvent)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _repo.Add(tEvent);
            var save = await _repo.SaveAsync(tEvent);

            return CreatedAtAction("GetEvent", new { id = tEvent.EventId }, tEvent);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tEvent = await _context.Event.FindAsync(id);
            if (tEvent == null)
                return NotFound();

            _repo.Delete(tEvent);
            var save = await _repo.SaveAsync(tEvent);

            return Ok(tEvent);
        }

        private bool EventExists(int id)
        {
            return _context.Event.Any(e => e.EventId == id);
        }
    }
}

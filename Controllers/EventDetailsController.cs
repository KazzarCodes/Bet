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
    public class EventDetailsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataRepository<EventDetail> _repo;

        public EventDetailsController(DataContext context, IDataRepository<EventDetail> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/EventDetails
        [HttpGet]
        public IEnumerable<EventDetail> GetEventDetails()
        {
            return _context.EventDetail.OrderByDescending(e => e.EventDetailId);
        }

        [HttpGet("eventdetails/{id}")]
        public IEnumerable<EventDetail> GetEventDetailsByEvent([FromRoute] int id)
        {
            var results = _context.EventDetail.Where(e => e.EventId == id).OrderByDescending(e => e.EventDetailId);
            return results;
        }

        // GET: api/EventDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var eventDetail = await _context.EventDetail.FindAsync(id);

            if (eventDetail == null)
                return NotFound();

            return Ok(eventDetail);
        }

        // PUT: api/EventDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventDetail([FromRoute] int id, [FromBody] EventDetail eventDetail)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != eventDetail.EventDetailId)
                return BadRequest();

            _context.Entry(eventDetail).State = EntityState.Modified;

            try
            {
                _repo.Update(eventDetail);
                var save = await _repo.SaveAsync(eventDetail);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventDetailExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/EventDetails
        [HttpPost]
        public async Task<IActionResult> PostEventDetail([FromBody] EventDetail eventDetail)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _repo.Add(eventDetail);
            var save = await _repo.SaveAsync(eventDetail);

            return CreatedAtAction("GetEventDetail", new { id = eventDetail.EventDetailId }, eventDetail);
        }

        // DELETE: api/EventDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var eventDetail = await _context.EventDetail.FindAsync(id);
            if (eventDetail == null)
                return NotFound();

            _repo.Delete(eventDetail);
            var save = await _repo.SaveAsync(eventDetail);

            return Ok(eventDetail);
        }

        private bool EventDetailExists(int id)
        {
            return _context.EventDetail.Any(e => e.EventDetailId == id);
        }
    }
}

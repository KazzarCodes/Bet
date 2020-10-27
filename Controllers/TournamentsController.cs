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
    public class TournamentsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataRepository<Tournament> _repo;

        public TournamentsController(DataContext context, IDataRepository<Tournament> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Tournaments
        [HttpGet]
        public IEnumerable<Tournament> GetTournaments()
        {
            var results = _context.Tournament.OrderBy(p => p.TournamentId);
            return results;
        }

        // GET: api/Tournaments/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTournament([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tournament = await _context.Tournament.FindAsync(id);

            if (tournament == null)
                return NotFound();

            return Ok(tournament);
        }

        // PUT: api/Tournaments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTournament([FromRoute] int id, [FromBody] Tournament tournament)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != tournament.TournamentId)
                return BadRequest();

            _context.Entry(tournament).State = EntityState.Modified;

            try
            {
                _repo.Update(tournament);
                var save = await _repo.SaveAsync(tournament);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TournamentExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/Tournaments
        [HttpPost]
        public async Task<IActionResult> PostTournament([FromBody] Tournament tournament)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _repo.Add(tournament);
            var save = await _repo.SaveAsync(tournament);

            return CreatedAtAction("GetTournament", new { id = tournament.TournamentId }, tournament);
        }

        // DELETE: api/Tournaments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTournament([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tournament = await _context.Tournament.FindAsync(id);
            if (tournament == null)
                return NotFound();

            _repo.Delete(tournament);
            var save = await _repo.SaveAsync(tournament);

            return Ok(tournament);
        }

        private bool TournamentExists(int id)
        {
            return _context.Tournament.Any(e => e.TournamentId == id);
        }
    }
}

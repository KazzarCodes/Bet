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
    public class EventDetailStatusController : ControllerBase
    {
        private readonly DataContext _context;

        public EventDetailStatusController(DataContext context)
        {
            _context = context;
        }

        // GET: api/EventDetailStatus
        [HttpGet]
        public IEnumerable<EventDetailStatus> GetStatuses()
        {
            return _context.EventDetailStatus.OrderBy(s => s.EventDetailStatusId);
        }
    }
}

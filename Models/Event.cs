using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bet.Models
{
    public class Event
    {
        [Key]
        public int EventId { get; set; }

        public int TournamentId { get; set; }

        public string EventName { get; set; }

        public int EventNumber { get; set; }

        public DateTime EventDateTime { get; set; }

        public DateTime EventEndDateTime { get; set; }

        public bool AutoClose { get; set; }
    }
}

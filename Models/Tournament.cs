using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bet.Models
{
    public class Tournament
    {
        [Key]
        public int TournamentId { get; set; }

        public string TournamentName { get; set; }

        public string TournamentDesc { get; set; }
    }
}

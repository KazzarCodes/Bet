using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bet.Models
{
    public class EventDetail
    {
        [Key]
        public int EventDetailId { get; set; }

        public int EventId { get; set; }

        public int EventDetailStatusId { get; set; }

        public string EventDetailName { get; set; }

        public decimal EventDetailOdd { get; set; }

        public int FinishingPosition { get; set; }

        public bool FirstTimer { get; set; }
    }
}

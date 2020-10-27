using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bet.Models
{
    public class EventDetailStatus
    {
        [Key]
        public int EventDetailStatusId { get; set; }

        public string EventDetailStatusName { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bet.Models;
using Microsoft.EntityFrameworkCore;

namespace Bet.Data
{
    public class DataContext : DbContext
    {
        public DataContext (DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Tournament> Tournament { get; set; }
        public DbSet<Event> Event { get; set; }
        public DbSet<EventDetail> EventDetail { get; set; }
        public DbSet<EventDetailStatus> EventDetailStatus { get; set; }
    }
}

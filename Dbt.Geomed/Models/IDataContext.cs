using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.Models
{
    public interface IDataContext
    {
        DbSet<Service> Services { get; }
        DbSet<User> Users { get; }
        DbSet<Company> Companies { get; }
    }
}

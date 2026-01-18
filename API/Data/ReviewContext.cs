using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ReviewContext(DbContextOptions<ReviewContext> options) : DbContext(options)
{
    public required DbSet<Review> Reviews { get; set; }
    public required DbSet<Consultant> Consultants { get; set; }
}

using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var context = scope.ServiceProvider.GetService<ReviewContext>()
        ?? throw new InvalidOperationException("Failed to retrive context");
        SeedData(context);
    }

    private static void SeedData(ReviewContext context)
    {
        context.Database.Migrate();
        if (context.Consultants.Any()) return;
        var consultants = new List<Consultant>
        {

            new Consultant
            {
                //Id = 1,
                Nume = "Pantea",
                Prenume = "Catalin",
                ImageUrl="",
                Descriere = "",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header",

            },
             new Consultant
            {
                //Id = 2,
                Nume = "Belei",
                Prenume = "Radu Vladuț",
                ImageUrl="",
                Descriere = "",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header"

            },
              new Consultant
            {
                //Id = 2,
                Nume = "Cosmina",
                Prenume = "Diana",
                ImageUrl="",
                Descriere = "",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header"

            }
        };
        context.Consultants.AddRange(consultants);
        context.SaveChanges();
    }
}

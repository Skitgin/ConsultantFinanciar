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
                Nume = "Radulescu",
                Prenume = "Radu",
                ImageUrl="",
                Descriere = "",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header",

            },
             new Consultant
            {
                //Id = 2,
                Nume = "Enescu",
                Prenume = "Ene",
                ImageUrl="",
                Descriere = "",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header"

            },
              new Consultant
            {
                //Id = 2,
                Nume = "Viorescu",
                Prenume = "Viorica",
                ImageUrl="",
                Descriere = "",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header"

            }
        };
        context.Consultants.AddRange(consultants);
        context.SaveChanges();
    }
     private static void SeedDataReviews(ReviewContext context)
    {
        context.Database.Migrate();
        if (context.Reviews.Any()) return;
        var reviews= new List<Review>
        {

            new Review
            {
                //Id = 1,
                Nume = "Xulan",
                Prenume = "Xulescu",
                Consultant="Radu Radulescu ",
                Descriere = "Am avut o experiență foarte bună cu consilierul economic. Mi-a explicat clar toate opțiunile și m-a ajutat să iau decizii financiare mai sigure. Profesionalism și răbdare pe tot parcursul colaborării.",
                Scor =5
            },
              new Review
            {
                //Id = 1,
                Nume = "Marian",
                Prenume = "Marinescu",
                Consultant="Ene Enescu",
                Descriere = "Consilierul economic a fost extrem de bine pregătit și atent la nevoile mele. Am primit soluții personalizate și ușor de aplicat. Recomand cu încredere pentru oricine vrea mai mult control asupra finanțelor",
                Scor =5

            },
           new Review
            {
                //Id = 1,
                Nume = "Andreea",
                Prenume = "Andreescu",
                Consultant="Viorica Viorescu",
                Descriere = "O colaborare excelentă! Am apreciat modul structurat de lucru și explicațiile pe înțelesul meu. M-am simțit susținută și informată la fiecare pas.",
                Scor=5

            },
        };
        context.Reviews.AddRange(reviews);
        context.SaveChanges();
    }
}

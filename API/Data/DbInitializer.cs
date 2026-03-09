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
        SeedDataReviews(context);
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
                Nume = "Maria",
                Prenume = "Ionescu",
                ImageUrl="/Gemini1.webp",
                Descriere = "Sunt consultant financiar cu peste 12 ani de experiență în planificare financiară personală și optimizare fiscală. Lucrez în special cu antreprenori și profesioniști din domeniul IT, ajutându-i să își structureze veniturile și să își construiască strategii financiare sustenabile pe termen lung. Pun accent pe soluții personalizate, transparență și educație financiară, astfel încât fiecare client să poată lua decizii informate și sigure.\n\n Specializări:\n\nPlanificare financiară personală\nStrategii de investiții\nOptimizare fiscală\nManagementul riscului",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header",
                LinkLinkedIn="https://www.linkedin.com/",
                LinkInstagram="https://www.instagram.com/",
                LinkFacebook ="https://www.facebook.com/"
            },
             new Consultant
            {
                //Id = 2,
                Nume = "Anderi",
                Prenume = "Popescu",
                ImageUrl="/Gemini2.webp",
                Descriere = "Sunt consultant financiar cu peste 12 ani de experiență în planificare financiară personală și optimizare fiscală. Lucrez în special cu antreprenori și profesioniști din domeniul IT, ajutându-i să își structureze veniturile și să își construiască strategii financiare sustenabile pe termen lung. Pun accent pe soluții personalizate, transparență și educație financiară, astfel încât fiecare client să poată lua decizii informate și sigure.\n\n Specializări:\n\nPlanificare financiară personală\nStrategii de investiții\nOptimizare fiscală\nManagementul riscului",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header",
                LinkLinkedIn="https://www.linkedin.com/",
                LinkInstagram="https://www.instagram.com/",
                LinkFacebook ="https://www.facebook.com/"

            },
              new Consultant
            {
                //Id = 2,
                Nume = "Radu",
                Prenume = "Dumintrescu",
                ImageUrl="/Gemini3.webp",
                Descriere = "Sunt consultant financiar cu peste 12 ani de experiență în planificare financiară personală și optimizare fiscală. Lucrez în special cu antreprenori și profesioniști din domeniul IT, ajutându-i să își structureze veniturile și să își construiască strategii financiare sustenabile pe termen lung. Pun accent pe soluții personalizate, transparență și educație financiară, astfel încât fiecare client să poată lua decizii informate și sigure.\n\n Specializări:\n\nPlanificare financiară personală\nStrategii de investiții\nOptimizare fiscală\nManagementul riscului",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header",
                LinkInstagram="https://www.instagram.com/",
                LinkFacebook ="https://www.facebook.com/",
                LinkLinkedIn="https://www.linkedin.com/",

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
                Nume = "Ruslan",
                Prenume = "Ruslescu",
                Consultant="Radu Dumitrescu ",
                Descriere = "Am avut o experiență foarte bună cu consilierul economic. Mi-a explicat clar toate opțiunile și m-a ajutat să iau decizii financiare mai sigure. Profesionalism și răbdare pe tot parcursul colaborării.",
                Scor =5
            },
              new Review
            {
                //Id = 1,
                Nume = "Marian",
                Prenume = "Marinescu",
                Consultant="Maria Ionescu",
                Descriere = "Consilierul economic a fost extrem de bine pregătit și atent la nevoile mele. Am primit soluții personalizate și ușor de aplicat. Recomand cu încredere pentru oricine vrea mai mult control asupra finanțelor",
                Scor =5

            },
           new Review
            {
                //Id = 1,
                Nume = "Andreea",
                Prenume = "Andreescu",
                Consultant="Andrei Popescu",
                Descriere = "O colaborare excelentă! Am apreciat modul structurat de lucru și explicațiile pe înțelesul meu. M-am simțit susținută și informată la fiecare pas.",
                Scor=5

            },
        };
        context.Reviews.AddRange(reviews);
        context.SaveChanges();
    }
}

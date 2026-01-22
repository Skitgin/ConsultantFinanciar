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
                Nume = "Cosmina",
                Prenume = "Diana",
                ImageUrl="/Cosmina.webp",
                Descriere = "Am descoperit lumea finanțelor nu din manuale, ci din realitatea vieții de zi cu zi — atunci când am realizat cât de greu este să trăiești fără o siguranță financiară reală.Am văzut oameni muncitori, inteligenți, care își pierd liniștea nu pentru că nu câștigă suficient, ci pentru că nu știu cum să gestioneze eficient ceea ce au.\n\n Așa a început drumul meu.\n\nDupă ce am absolvit studiile economice și m-am specializat în domeniul financiar, am obținut și acreditarea oficială ISF (Institutul de Studii Financiare), iar de atunci, mi-am propus o misiune clară: să-i ajut pe români să scape de povara unei situații financiare instabile și să își construiască, pas cu pas, un plan care le aduce siguranță, echilibru și libertate.\n\n Cred că educația financiară nu este un lux, ci o nevoie de bază, iar scopul meu este să fac acest proces accesibil, realist și mai ales, potrivit, pentru ca oricine să poată trăi o viață fără stresul banilor și cu mai multă încredere în propriul viitor.",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header",

            },
             new Consultant
            {
                //Id = 2,
                Nume = "Pantea",
                Prenume = "Catalin",
                ImageUrl="/Cata.webp",
                Descriere = "",
                Link="https://docs.google.com/forms/d/e/1FAIpQLSeXWPCBCCVcYguoQ1AOs6yRfAD2mhbI1L3jJtY1NksOoYYm1w/viewform?usp=header"

            },
              new Consultant
            {
                //Id = 2,
                Nume = "Belei",
                Prenume = "Radu Vladut",
                ImageUrl="",
                Descriere = "",
                Link="https://calendar.google.com/calendar/u/0/r/eventedit?text=Consultan%C8%9B%C4%83+Financiar%C4%83&dates=20240405T100000Z/20240405T110000Z&details=Discut%C4%83m+despre+siguran%C8%9Ba+ta+financiar%C4%83!&location=Online&sf=true&output=xml"

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

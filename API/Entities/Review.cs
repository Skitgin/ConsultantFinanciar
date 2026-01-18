
namespace API.Entities
{
    public class Review
    {
        public int Id { get; set; }
        public required string Nume { get; set; }
        public required string Prenume { get; set; }
        public required string Descriere { get; set; }
        public required string Consultant { get; set; }
        public int Scor { get; set; }
    }
}
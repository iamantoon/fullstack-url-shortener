namespace API.Entities
{
    public class AppLink
    {
        public int Id { get; set; }
        public string ShortLink { get; set; }
        public string Link { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public int UserId { get; set; }
    }
}
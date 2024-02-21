namespace API.Helpers
{
    public class LinkParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize ? MaxPageSize : value);
        }

        public int MinExpiryDate { get; set; } = 0;
        public int MaxExpiryDate { get; set; } = 365;
        public string OrderBy { get; set; } = "newest";
    }
}
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateLinkDto
    {
        [Required] public string Link { get; set; }
        [Required] public string ExpiryDate { get; set; }        
    }
}
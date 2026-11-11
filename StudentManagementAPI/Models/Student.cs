
using System.ComponentModel.DataAnnotations;

namespace StudentManagementAPI.Models
{
    public class Student
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Student code is required.")]
        [StringLength(20)]
        public string StudentCode { get; set; } = string.Empty;

        [Required(ErrorMessage = "Full name is required.")]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Range(16, 100, ErrorMessage = "Age must be between 16 and 100.")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Major is required.")]
        [StringLength(100)]
        public string Major { get; set; } = string.Empty;

        [Range(0, 4, ErrorMessage = "GPA must be between 0 and 4.")]
        public double GPA { get; set; }
    }
}

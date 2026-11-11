
using Microsoft.AspNetCore.Mvc;
using StudentManagementAPI.Models;

namespace StudentManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        // Temporary in-memory data
        private static readonly List<Student> Students = new()
        {
            new Student
            {
                Id = 1,
                StudentCode = "SV001",
                FullName = "Nguyen Van A",
                Age = 21,
                Email = "student1@example.com",
                Major = "Information Technology",
                GPA = 3.6
            },
            new Student
            {
                Id = 2,
                StudentCode = "SV002",
                FullName = "Tran Thi B",
                Age = 20,
                Email = "student2@example.com",
                Major = "Computer Science",
                GPA = 3.8
            },
            new Student
            {
                Id = 3,
                StudentCode = "SV003",
                FullName = "Le Van C",
                Age = 22,
                Email = "student3@example.com",
                Major = "Software Engineering",
                GPA = 3.2
            }
        };

        // GET: api/students
        [HttpGet]
        public ActionResult<IEnumerable<Student>> GetAll()
        {
            return Ok(Students);
        }

        // GET: api/students/1
        [HttpGet("{id:int}")]
        public ActionResult<Student> GetById(int id)
        {
            var student = Students.FirstOrDefault(
                s => s.Id == id);

            if (student == null)
            {
                return NotFound(new
                {
                    message = $"Student with ID {id} not found."
                });
            }

            return Ok(student);
        }
    }
}

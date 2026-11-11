
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementAPI.Data;
using StudentManagementAPI.Models;

namespace StudentManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        // Database context
        private readonly AppDbContext _context;

        // Dependency Injection
        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>>
            GetAll()
        {
            var students = await _context.Students
                .AsNoTracking()
                .ToListAsync();

            return Ok(students);
        }

        // GET: api/students/1
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Student>>
            GetById(int id)
        {
            var student = await _context.Students
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == id);

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

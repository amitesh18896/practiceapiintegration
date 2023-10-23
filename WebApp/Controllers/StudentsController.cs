using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;

namespace WebApp.Controllers
{
    [RoutePrefix("api/students")]
    public class StudentsController : ApiController
    {

        private WebAppContext db = new WebAppContext();

        // GET: api/books
        [HttpGet]
        [Route("")]
        [ResponseType(typeof(IEnumerable<Student>))]
        public async Task<IHttpActionResult> GetStudents()
        {
            try
            {
            
                List<Student> students = await db.Students.ToListAsync();

                return Ok(students);
            }
            catch (Exception ex)
            {
           
                return InternalServerError(ex);
            }
        }
    }
}
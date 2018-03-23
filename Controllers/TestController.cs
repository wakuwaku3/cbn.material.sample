using Microsoft.AspNetCore.Mvc;

namespace cbn.undux.sample.Controllers
{
    public class TestController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public string Get()
        {
            return "success!";
        }

        [HttpGet]
        public int GetStep()
        {
            return 10;
        }
    }
}
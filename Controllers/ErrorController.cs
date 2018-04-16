using System.Diagnostics;
using cbn.material.sample.Models;
using Microsoft.AspNetCore.Mvc;

namespace cbn.material.sample.Controllers
{
    public class ErrorController : Controller
    {
        public IActionResult Index()
        {
            return View(new Models.ErrorViewModel
            {
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
            });
        }
    }
}
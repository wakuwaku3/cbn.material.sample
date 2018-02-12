using cbn.react.sample.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace cbn.react.sample.Controllers
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
using System.Diagnostics;
using cbn.undux.sample.Models;
using Microsoft.AspNetCore.Mvc;

namespace cbn.undux.sample.Controllers
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
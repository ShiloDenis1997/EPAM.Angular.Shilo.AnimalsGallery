using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ORM;

namespace AnimalsGallery.Controllers
{
    public class TextPartsController : Controller
    {
        private DbContext context;

        public TextPartsController(DbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public JsonResult GetTextPart(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return Json(new {status = false}, JsonRequestBehavior.AllowGet);
            }

            TextPart textPart = context.Set<TextPart>().Find(name);
            if (textPart == null)
            {
                return Json(new {status = true, text = "", name = name}, JsonRequestBehavior.AllowGet);
            }

            return Json(new {status = true, text = textPart.TextValue, name = textPart.Name},
                JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SetTextPart(string name, string text)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return Json(new { status = false });
            }

            TextPart textPart = context.Set<TextPart>().Find(name);

            if (textPart == null)
            {
                textPart = new TextPart {Name = name, TextValue = text};
                context.Set<TextPart>().Add(textPart);
            }
            else
            {
                textPart.TextValue = text;
            }

            context.SaveChanges();
            return Json(new {status = true});
        }
    }
}
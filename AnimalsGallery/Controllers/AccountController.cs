using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using AnimalsGallery.Providers;

namespace AnimalsGallery.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Register(string login, string password)
        {
            if (string.IsNullOrWhiteSpace(login) || string.IsNullOrWhiteSpace(password))
            {
                return Json(new { status=false, message="invalid login or password format"});
            }

            MembershipUser user = ((UserMembershipProvider) Membership.Provider)
                .CreateUser(login, password);

            if (user == null)
            {
                return Json(new
                {
                    status = false,
                    message = "invalid login or password format"
                }, JsonRequestBehavior.AllowGet);
            }

            FormsAuthentication.SetAuthCookie(login, false);
            return Json(new {status=true});
        }
    }
}
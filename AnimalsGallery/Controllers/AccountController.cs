using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using AnimalsGallery.Providers;
using ORM;

namespace AnimalsGallery.Controllers
{
    public class AccountController : Controller
    {
        private DbContext context;

        public AccountController(DbContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public JsonResult Register(string login, string password)
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
                });
            }

            FormsAuthentication.SetAuthCookie(login, false);
            return Json(new {status = true, rights = "User"});
        }

        [HttpPost]
        public JsonResult SignIn(string login, string password)
        {
            if (string.IsNullOrWhiteSpace(login) || string.IsNullOrWhiteSpace(password))
            {
                return Json(new { status = false, message = "invalid login or password format" });
            }

            if (Membership.ValidateUser(login, password))
            {
                FormsAuthentication.SetAuthCookie(login, false);
                User user = context.Set<User>().Include(u => u.Role).First(u => u.Name.Equals(login));

                return Json(new {status = true, rights = user.Role.Rolename});
            }

            return Json(new {status = false});
        }
    }
}
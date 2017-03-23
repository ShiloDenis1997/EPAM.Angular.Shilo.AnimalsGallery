using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Security;
using ORM;

namespace AnimalsGallery.Providers
{
    public class UserRoleProvider : RoleProvider
    {
        private DbContext context => (DbContext)
            System.Web.Mvc.DependencyResolver.Current.GetService(typeof(DbContext));

        public override string[] GetRolesForUser(string login)
        {
            string[] roles = {};
            var user = context.Set<User>().Include(u => u.Role).FirstOrDefault(u => u.Name.Equals(login));

            if (user == null)
                return roles;
            return new[] {user.Role.Rolename};
        }

        public override bool IsUserInRole(string login, string roleName)
        {
            var user = context.Set<User>().Include(u => u.Role)
                .FirstOrDefault(u => u.Name.Equals(login));

            if (user == null)
            {
                return false;
            }

            switch (user.Role.Rolename)
            {
                case "Administrator":
                    return true;
                case "Moderator":
                    return !roleName.Equals("Administrator");
                default:
                    return roleName.Equals(user.Role.Rolename);
            }
        }

        #region Stubs
        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }
        
        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }
        
        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
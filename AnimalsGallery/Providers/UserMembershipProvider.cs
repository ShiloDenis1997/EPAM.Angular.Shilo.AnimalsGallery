using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Helpers;
using System.Web.Security;
using ORM;

namespace AnimalsGallery.Providers
{
    public class UserMembershipProvider : MembershipProvider
    {
        private DbContext context => (DbContext) 
            System.Web.Mvc.DependencyResolver.Current.GetService(typeof(DbContext));

        public User CreateUser(string login, string password)
        {
            MembershipUser membershipUser = GetUser(login, false);
            
            if (membershipUser != null)
            {
                return null;
            }

            User user = new User
            {
                Name = login,
                Role = context.Set<Role>().First(r => r.Rolename == "User"),
                Password = Crypto.HashPassword(password)
            };

            context.Set<User>().Add(user);
            context.SaveChanges();
            return user;
        }

        public override MembershipUser GetUser(string login, bool userIsOnline)
        {
            var user = context.Set<User>().FirstOrDefault(u => u.Name.Equals(login));
            if (user == null)
                return null;
            return new MembershipUser("UserMembershipProvider", user.Name, null, 
                null, null, null, false, false, DateTime.MinValue, 
                DateTime.MinValue, DateTime.MinValue, DateTime.MinValue, 
                DateTime.MinValue
                );
        }

        public override bool ValidateUser(string login, string password)
        {
            User user = 
                context.Set<User>().FirstOrDefault(u => u.Name.Equals(login));
                                
            if (user != null && Crypto.VerifyHashedPassword(user.Password, password))
            {
                return true;
            }
            return false;
        }

        public override bool DeleteUser(string email, bool deleteAllRelatedData)
        {
            throw new NotImplementedException();
        }

        #region Stubs

        public override MembershipUser CreateUser(string username, string password, string email, string passwordQuestion, string passwordAnswer, bool isApproved, object providerUserKey, out MembershipCreateStatus status)
        {
            throw new NotImplementedException();
        }

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

        public override bool EnablePasswordReset
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override bool EnablePasswordRetrieval
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override int MaxInvalidPasswordAttempts
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override int MinRequiredNonAlphanumericCharacters
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override int MinRequiredPasswordLength
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override int PasswordAttemptWindow
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override MembershipPasswordFormat PasswordFormat
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override string PasswordStrengthRegularExpression
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override bool RequiresQuestionAndAnswer
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override bool RequiresUniqueEmail
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override bool ChangePassword(string username, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        public override bool ChangePasswordQuestionAndAnswer(string username, string password, string newPasswordQuestion, string newPasswordAnswer)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection FindUsersByName(string usernameToMatch, int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection GetAllUsers(int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override int GetNumberOfUsersOnline()
        {
            throw new NotImplementedException();
        }

        public override string GetPassword(string username, string answer)
        {
            throw new NotImplementedException();
        }

        public override MembershipUser GetUser(object providerUserKey, bool userIsOnline)
        {
            throw new NotImplementedException();
        }

        public override string GetUserNameByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public override string ResetPassword(string username, string answer)
        {
            throw new NotImplementedException();
        }

        public override bool UnlockUser(string userName)
        {
            throw new NotImplementedException();
        }

        public override void UpdateUser(MembershipUser user)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
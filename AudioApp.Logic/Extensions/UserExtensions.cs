
using AudioApp.Logic.Models;
using AudioApp.Model;


namespace AudioApp.Logic.Extensions
{
    static class UserExtensions
    {
        public static UserBl toBl(this User user)
        {
            return new UserBl
            {
                Id = user.Id,
                Name = user.Name,
                Age = user.Age,
                LastName = user.LastName
            };
        }

    }
}

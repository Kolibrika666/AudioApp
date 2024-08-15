using AudioApp.DAL;
using AudioApp.Logic.Contracts;
using AudioApp.Logic.Extensions;
using AudioApp.Logic.Models;
using Microsoft.EntityFrameworkCore;

namespace AudioApp.Logic.Impl;

public class UserService : IUserService
{
    readonly AudioAppContext _dbContext;
    public UserService(AudioAppContext dbContext)
    {
        _dbContext = dbContext;
    }

    public ListUserBl GetList(ListFilter filter)
    {
        var query = _dbContext.Users.AsQueryable();

        if (!string.IsNullOrEmpty(filter.Name))
            query = query.Where(_ => EF.Functions.ILike(_.Name, $"%{filter.Name}%"));

        if (filter.Age is not null)
            query = query.Where(_ => _.Age == filter.Age);

        int total = query.Count();

        return new ListUserBl
        {
            Users = query
            .Skip(filter.Skip ?? 0)
            .Take(filter.Take ?? 1000)
            .Select(_ => _.toBl()).ToList(),
            TotalCount = total,
        };
    }

    public UserBl Get(int id)
    {
        var res = _dbContext.Users.Find(id);
        if (res is null)
            return default;

        return res.toBl();
    }


    public UserBl Create(UserCreateBl bl)
    {
        if (bl.Age != 0 && !string.IsNullOrEmpty(bl.Name.Trim()) && !string.IsNullOrEmpty(bl.LastName.Trim()))
        {
            var newUser = new Model.User
            {
                Age = bl.Age,
                Name = bl.Name,
                LastName = bl.LastName
            };
            var entryUser = _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();
            return entryUser.Entity.toBl();
        }
        throw new FormatException();
    }

    public UserBl Update(int id, UserUpdateBl bl)
    {
        if (bl.Age != 0 && !string.IsNullOrEmpty(bl.Name.Trim()) && !string.IsNullOrEmpty(bl.LastName.Trim()))
        {
            var result = _dbContext.Users.Find(id);
            if (result != null)
            {
                result.Age = bl.Age;
                result.Name = bl.Name;
                result.LastName = bl.LastName;

                _dbContext.SaveChanges();
                return result.toBl();
            }
        }
        throw new FormatException();
    }

    public void Delete(int id)
    {
        var user = _dbContext.Users.Find(id);
        if (user != null)
        {
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
        }
    }

}

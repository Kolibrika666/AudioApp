using AudioApp.Logic.Models;
using AudioApp.Model;

namespace AudioApp.Logic.Contracts;

public interface IUserService
{
    public IEnumerable<UserBl> GetList(ListFilter filter);
    public UserBl Get(int id);
    public UserBl Create(UserCreateBl bl);
    public UserBl Update(int id, UserUpdateBl bl);
    public void Delete(int id);
}
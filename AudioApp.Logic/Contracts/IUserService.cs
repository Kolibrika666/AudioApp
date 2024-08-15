using AudioApp.Logic.Models;

namespace AudioApp.Logic.Contracts;

public interface IUserService
{
    public ListUserBl GetList(ListFilter filter);
    public UserBl Get(int id);
    public UserBl Create(UserCreateBl bl);
    public UserBl Update(int id, UserUpdateBl bl);
    public void Delete(int id);
}
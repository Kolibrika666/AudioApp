using AudioApp.Model;

namespace AudioApp.Logic.Models;

public class UserBl
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public UserRoleEnum Role { get; set; }
}

public class UserCreateBl
{
    public string Name { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public UserRoleEnum Role { get; set; }
}

public class UserUpdateBl
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public UserRoleEnum Role { get; set; }
}

public class ListUserBl
{
    public IEnumerable<UserBl> Users { get; set; }
    public int TotalCount { get; set; }
}

public record ListFilter(string Name, int? Age, int? Skip, int? Take, UserRoleEnum? Role);
namespace AudioApp.Logic.Models;

public class UserBl
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
}

public class UserCreateBl
{
    public string Name { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
}

public class UserUpdateBl
{
    public string Name { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
}

public record ListFilter(string Name, int? Age);
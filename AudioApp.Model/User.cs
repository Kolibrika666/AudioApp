namespace AudioApp.Model;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public UserRoleEnum Role { get; set; }

}

[Flags]
public enum UserRoleEnum : short
{
    None = 0,
    Dev = 1,
    Tester = 2,
    Manager = 4,
    Customer = 8
}
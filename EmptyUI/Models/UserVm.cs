using System.Collections.Generic;

namespace AudioApp.Logic.Models;

public class UserVm
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
}

public class ListUserVm
{
    public IEnumerable<UserVm> Users { get; set; }
    public int TotalCount { get; set; }
}
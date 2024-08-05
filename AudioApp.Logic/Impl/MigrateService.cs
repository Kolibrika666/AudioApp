using AudioApp.DAL;
using AudioApp.Logic.Contracts;
using Microsoft.EntityFrameworkCore;

namespace AudioApp.Logic.Impl;

public class MigrateService : IMigrateService
{
    readonly AudioAppContext _dbContext;
    public MigrateService(AudioAppContext dbContext)
    {
        _dbContext = dbContext;
    }
    public void MigrateDatabase()
    {   
        _dbContext.Database.Migrate();
    }
}

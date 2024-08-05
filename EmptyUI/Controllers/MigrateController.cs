using AudioApp.Logic.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace AudioApp.Api.Controllers;

[ApiController]
public class MigrateController : ControllerBase
{
    readonly IMigrateService _migrateService;
    public MigrateController(IMigrateService migrateService)
    {
        _migrateService = migrateService;
    }

    [Route("Migrate")]
    public void Migrate()
    {
        _migrateService.MigrateDatabase();
    }
}

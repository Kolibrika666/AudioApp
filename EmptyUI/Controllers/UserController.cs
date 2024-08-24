using AudioApp.Logic.Contracts;
using AudioApp.Logic.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace AudioApp.Api.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class UserController : ControllerBase
{
    readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public ActionResult<ListUserBl> GetList([FromQuery] ListFilter filter)
    {
        var list = _userService.GetList(filter);

        return Ok(list);
    }

    [HttpGet]
    public ActionResult<UserBl> Get(int id)
    {
        var res = _userService.Get(id);
        if (res == null)
            return NotFound();

        return Ok(res);
    }

    [HttpDelete]
    public ActionResult Delete(int id)
    {
        _userService.Delete(id);

        return Ok();
    }

    [HttpPost]
    public ActionResult<UserBl> Create(UserCreateBl bl)
    {
        _userService.Create(bl);
        return Ok(bl);
    }

    [HttpPut]
    public ActionResult<UserBl> Update([FromBody] UserUpdateBl bl)
    {
        _userService.Update(bl);
        return Ok(userBl);
    }
}
using Autherization.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Autherization.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]LoginModel user)
        {
            if (user == null)
                return BadRequest();
            /*Console.WriteLine(user.UserName +","+ user.Password);*/
            if(user.UserName == "pod3" && user.Password == "pod3@123")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("supersecretkey@345"));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer:"https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: signingCredentials
                    );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new { Token = tokenString });
            }

            return Unauthorized();

        }

       
    }
}

using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace OhmsND.API.Extensions
{
    public static class IdentityExtensions
    {
        public static string GetId(this HttpContext httpContext)
        {
            return httpContext.User.GetId();
        }
        public static string GetUserName(this HttpContext httpContext)
        {
            return httpContext.User.GetUserName();
        }
        public static string GetId(this ClaimsPrincipal principal)
        {
            return principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
        public static string GetUserName(this ClaimsPrincipal principal)
        {
            return principal.FindFirst("name")?.Value;
        }
    }
}
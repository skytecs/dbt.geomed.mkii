using System;
using System.Security.Claims;

namespace Dbt.Geomed.Services
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetId(this ClaimsPrincipal user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var claim = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(claim))
            {
                throw new ArgumentNullException(nameof(claim));
            }

            return Int32.TryParse(claim, out int result) ? result : throw new InvalidCastException(nameof(claim));

        }

    }
}
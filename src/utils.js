function getAuthToken() {
  // Try to get token from session storage (for API clients)
  const sessionToken = sessionStorage.getItem("authorization");
  if (sessionToken) {
    return sessionToken;
  }

  // Fallback to cookie (for browser clients)
  const match = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
  if (match) {
    return match[2];
  }

  return null;
}

function removeAuthToken() {
  // Remove token from session storage
  sessionStorage.removeItem("authorization");

  // Remove cookie by setting its expiration date to the past
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}

export { getAuthToken, removeAuthToken };
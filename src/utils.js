function getAuthToken() {
  const match = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
  if (match) {
    return match[2];
  }
  return '';
}

function removeAuthToken() {
  // Remove cookie by setting its expiration date to the past
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}

export { getAuthToken, removeAuthToken };
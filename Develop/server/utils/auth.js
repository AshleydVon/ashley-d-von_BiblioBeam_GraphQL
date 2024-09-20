import decode from 'jwt-decode';

class AuthService {
  // Get user profile by decoding the token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in by checking if the token is valid
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Set token in localStorage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/'); // Redirect after login
  }

  // Remove token from localStorage and log the user out
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();

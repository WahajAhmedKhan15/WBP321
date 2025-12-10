import api from '../utils/api';

export default class AuthService {
  static async login(values) {
    // .NET Core API expects body like { username, password }
    const res = await api.post('/Account/login', values);

    // return full response (token + userDetail)
    return res.data;
  }

  static setSession(data) {
    // your API gives: token, refreshToken, userDetail
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('refresh_token', data.refreshToken || '');
    localStorage.setItem('user', JSON.stringify(data.userDetail));
  }

  static logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  static getUser() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }
}

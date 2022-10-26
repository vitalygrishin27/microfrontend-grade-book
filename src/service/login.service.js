import apiClient from "../helper/apiClient";

class LoginService {
    loginIn = (user, token) => apiClient().post('users/token', user, {params:{token}});
    loginInByToken = (token) => apiClient().get('users/token', {params:{token}});
}

export default new LoginService();
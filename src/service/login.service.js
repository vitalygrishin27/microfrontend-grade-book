import apiClient from "../helper/apiClient";

class LoginService {
    loginIn = (user, token) => apiClient().post('users/token', user, {params:{token}});
}

export default new LoginService();
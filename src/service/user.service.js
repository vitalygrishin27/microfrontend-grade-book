import apiClient from "../helper/apiClient";

const endpoint = 'users';

class UserService {
    loadUserList = (token, needToSort) => apiClient().get(endpoint, {params: {token, needToSort}});
    loadTeacherList = (token, needToSort) => apiClient().get(endpoint + "/teachers", {params: {token, needToSort}});
    loadPupilList = (token, needToSort) => apiClient().get(endpoint + "/pupils", {params: {token, needToSort}});
    loadAdminList = (token, needToSort) => apiClient().get(endpoint + "/admins", {params: {token, needToSort}});
    loadAccessLevels = (token) => apiClient().get(endpoint + "/accessLevels", {params: {token}});
    createUser = (user, token) => apiClient().post(endpoint, user, {params: {token}});
    updateUser = (user, token) => apiClient().put(endpoint, user, {params: {token}});
    deleteUser = (userId, token) => apiClient().delete(endpoint + '/' + userId, {params: {token}});
}

export default new UserService();
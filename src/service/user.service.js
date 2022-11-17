import apiClient from "../helper/apiClient";

const endpoint = 'users';

class UserService {
    loadUserList = (token, needToSort, search) => apiClient().get(endpoint, {params: {token, needToSort, search}});
    loadTeacherList = (token, needToSort, search) => apiClient().get(endpoint + "/teachers", {params: {token, needToSort, search}});
    loadPupilList = (token, needToSort, search) => apiClient().get(endpoint + "/pupils", {params: {token, needToSort, search}});
    loadAdminList = (token, needToSort, search) => apiClient().get(endpoint + "/admins", {params: {token, needToSort, search}});
    loadAccessLevels = (token) => apiClient().get(endpoint + "/accessLevels", {params: {token}});
    createUser = (user, token) => apiClient().post(endpoint, user, {params: {token}});
    updateUser = (user, token) => apiClient().put(endpoint, user, {params: {token}});
    deleteUser = (userId, token) => apiClient().delete(endpoint + '/' + userId, {params: {token}});
}

export default new UserService();
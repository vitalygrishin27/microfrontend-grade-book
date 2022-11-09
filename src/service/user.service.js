import apiClient from "../helper/apiClient";

const endpoint = 'users';

class UserService {
    loadUserList = (token) => apiClient().get(endpoint, {params: {token}});
    loadTeacherList = (token) => apiClient().get(endpoint+"/teachers", {params: {token}});
    loadPupilList = (token) => apiClient().get(endpoint+"/pupils", {params: {token}});
    loadAdminList = (token) => apiClient().get(endpoint+"/admins", {params: {token}});
    loadAccessLevels = (token) => apiClient().get(endpoint+"/accessLevels", {params: {token}});
    createUser = (user, token) => apiClient().post(endpoint, user, {params: {token}});
    updateUser = (user, token) => apiClient().put(endpoint, user, {params: {token}});
    deleteUser = (userId, token) => apiClient().delete(endpoint + '/' + userId, {params: {token}});
}

export default new UserService();
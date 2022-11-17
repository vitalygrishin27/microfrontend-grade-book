import apiClient from "../helper/apiClient";

class ClazzService {
    loadClazzList = (token, needToSort, search) => apiClient().get('classes', {params: {token, needToSort, search}});
    createClazz= (clazz, token) => apiClient().post('classes', clazz, {params: {token}});
    updateClazz = (clazz, token) => apiClient().put('classes', clazz, {params: {token}});
    deleteClazz = (clazzId, token) => apiClient().delete('classes/' + clazzId, {params: {token}});
}

export default new ClazzService();
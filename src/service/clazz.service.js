import apiClient from "../helper/apiClient";

class ClazzService {
    loadClazzList = (token) => apiClient().get('classes', {params: {token}});
    createClazz= (clazz, token) => apiClient().post('classes', clazz, {params: {token}});
    updateClazz = (clazz, token) => apiClient().put('classes', clazz, {params: {token}});
    deleteClazz = (clazzId, token) => apiClient().delete('classes/' + clazzId, {params: {token}});
}

export default new ClazzService();
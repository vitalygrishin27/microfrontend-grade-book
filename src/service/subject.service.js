import apiClient from "../helper/apiClient";

class SubjectService {
    loadSubjectList = (token) => apiClient().get('subjects', {params:{token}});
}

export default new SubjectService();
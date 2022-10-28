import apiClient from "../helper/apiClient";

class SubjectService {
    loadSubjectList = (token) => apiClient().get('subjects', {params: {token}});
    createSubject = (subject, token) => apiClient().post('subjects', subject, {params: {token}});
    updateSubject = (subject, token) => apiClient().put('subjects', subject, {params: {token}});
    deleteSubject = (subjectId, token) => apiClient().delete('subjects/' + subjectId, {params: {token}});
}

export default new SubjectService();
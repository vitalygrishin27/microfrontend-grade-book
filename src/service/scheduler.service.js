import apiClient from "../helper/apiClient";

class SchedulerService {
    createScheduler = (scheduler, token) => apiClient().post('schedulers', scheduler, {params: {token}});
    loadScheduler = (clazzOid, token) => apiClient().get('schedulers/classes/' + clazzOid, {params: {token}});
    loadSchedulerForTeacher = (token) => apiClient().get('schedulers/teachers', {params: {token}});
}

export default new SchedulerService();
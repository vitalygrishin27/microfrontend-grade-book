import apiClient from "../helper/apiClient";

class SchedulerService {
    createScheduler = (scheduler, token) => apiClient().post('schedulers', scheduler, {params: {token}});
    loadScheduler = (clazzOid, token) => apiClient().get('schedulers/classes/' + clazzOid, {params: {token}});
}

export default new SchedulerService();
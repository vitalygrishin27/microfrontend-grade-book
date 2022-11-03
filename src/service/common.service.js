import apiClient from "../helper/apiClient";

class CommonService {
    getServiceVersion = (token) => apiClient().get('/version',{params:{token}});
}

export default new CommonService();
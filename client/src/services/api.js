import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

axios.defaults.baseURL = API_URL;

const dataService = {
    async allData(condition, sort_by, value) {
        return axios.get('data/all', {
            params: {
                condition,
                sort_by,
                value,
            },
        });
    },
    async paginationData(condition, sort_by, value, page, limit) {
        return axios.get('data', {
            params: {
                condition,
                sort_by,
                value,
                page,
                limit,
            },
        });
    },
};

export default dataService;

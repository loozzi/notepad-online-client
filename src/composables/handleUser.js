import axios from "axios";

const api = 'https://charming-gray-snapper.cyclic.app/user';
let token = '';
try {
    token = document.cookie.split('=')[1];
}
catch (error) {
    token = '';
}

function loginApi(username, password, remember) {
    return axios.post(api + '/login', { username, password }, {
        params: {
            remember: remember
        }
    });
}


function registerApi(username, email, password) {
    return axios.post(api + '/register', { username, password, email });
}


function getMyAccount() {
    return axios.get(api, {
        withCredentials: true,
        params: {
            token: token
        }
    });
}

function editAccount(payload) {
    return axios.put(api, payload, {
        withCredentials: true,
        params: {
            token: token
        }
    });
}

const userApi = {
    loginApi,
    registerApi,
    getMyAccount,
    editAccount
}

export default userApi;
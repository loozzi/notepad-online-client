import axios from "axios";

const api = 'https://charming-gray-snapper.cyclic.app/note';
let token = '';
try {
    token = document.cookie.split('=')[1];
}
catch (error) {
    token = '';
}


function getPostInHome(limit) {
    return axios.get(api, {
        withCredentials: true,
        params: {
            token: token,
            limit: limit
        }
    });
}

function createNewNote(payload) {
    return axios.post(api, payload, {
        withCredentials: true,
        params: {
            token: token
        }
    });
}

function getNote(permalink, password) {
    return axios.get(api + '/' + permalink, {
        withCredentials: true,
        params: {
            password
        }
    });
}

function updateNote(permalink, payload) {
    return axios.put(api + '/' + permalink, payload, {
        withCredentials: true,
        params: {
            token: token
        }
    })
}

function deleteNote(permalink, password) {
    return axios.delete(api + '/' + permalink, {
        withCredentials: true,
        params: {
            token: token,
            password: password
        }
    })
}

function getAllNote(page) {
    return axios.get(api + '/all', {
        withCredentials: true,
        params: {
            token: token,
            page: page,
            limit: 10
        }
    });
}

const noteApi = {
    getPostInHome,
    createNewNote,
    getNote,
    updateNote,
    deleteNote,
    getAllNote
};

export default noteApi;
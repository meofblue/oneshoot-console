import axios from "axios";

const endpoint = "https://api.oneshoot.me/v1";

export function queryList(data) {
    return axios.get(
        `${endpoint}/popular?page=${data.page}&search=${data.search}`
    );  
}

export function saveCollection(data) {
    return axios.post(`${endpoint}/collection`,data);
}
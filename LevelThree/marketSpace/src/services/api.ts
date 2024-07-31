import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.3.27:3333",
    timeout: 6000
})

export { api }
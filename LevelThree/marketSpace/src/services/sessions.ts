import { api } from "./api";

export async function postSession() {
    api.post("/sessions")

    api.defaults.headers.common['Authorization'] = `Bearer $token`
}
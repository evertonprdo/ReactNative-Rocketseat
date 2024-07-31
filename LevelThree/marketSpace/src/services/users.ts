import { api } from "./api";

export async function postUser() {
    api.post("/users")
}

export async function getUserMe() {
    api.get("/users/me")
}
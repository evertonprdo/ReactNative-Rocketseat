import { UserDTO } from "@dtos/UsersDTO";
import { api } from "@services/api";

type PostSessionResponseData = {
    token: string
    user: UserDTO
    refresh_token: string
}
export async function postSession(email: string, password: string) {
    try {
        const { data } = await api.post<PostSessionResponseData>("/sessions", { email, password })
        return data
        
    } catch (error) {
        throw error
    }
}

export function setDefaultHeaderAuthorizationToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
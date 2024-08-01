import { UserDTO } from "@dtos/UsersDTO";
import { api } from "@services/api";

type PostSessionsProps = {
    email: string
    password: string
}

type SessionsResponse = {
    token: string
    user: UserDTO
    refresh_token: string
}
export async function postSession({ email, password }: PostSessionsProps) {
    try {
        const { data } = await api.post<SessionsResponse>("/sessions", { email, password })

        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        return data
    } catch (error) {
        throw error
    }
}
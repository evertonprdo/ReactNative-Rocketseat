import { UserDTO } from "@dtos/UsersDTO";
import { api } from "./api";

const prefix = "/users"

type PostUserProps = Omit<UserDTO, "id" | "avatar"> & {
    avatar: any
    password: string
}
export async function postUser(user: PostUserProps) {
    try {
        const userForm = new FormData();
        for (const key in user) {
            userForm.append(key, user[key as keyof typeof user]);
        }

        await api.post(prefix, userForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        throw error
    }
}

export async function getUserMe() {
    try {
        const { data } = await api.get<UserDTO>(`${prefix}/me`)
        return data
    } catch (error) {
        throw error
    }
}
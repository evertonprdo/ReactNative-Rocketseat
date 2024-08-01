import { UserDTO } from "@dtos/UsersDTO";
import { api } from "./api";

const prefix = "/users"

type PostUserProps = Omit<UserDTO, "id" | "avatar"> & {
    avatar: any
    password: string
}
export async function postUser({ avatar, email, name, password, tel }: PostUserProps) {
    try {
        const userForm = new FormData();
        userForm.append('avatar', avatar);
        userForm.append('email', email);
        userForm.append('name', name);
        userForm.append('password', password);
        userForm.append('tel', tel);

        await api.post(prefix, userForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUserMe() {
    api.get(prefix + "/me")
}
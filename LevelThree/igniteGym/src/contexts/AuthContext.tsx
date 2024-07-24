import { UserDTO } from "@dtos/UserDTO";
import { createContext, PropsWithChildren, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
    singIn: (email: string, password: string) => void
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [ user, setUser ] = useState({
        id: "1",
        name: "Rodrigo",
        email: "rodrigo@email.com",
        avatar: "rodrigo.png"
    })

    function singIn(email: string, password: string) {
        setUser({
            id: '',
            name: '',
            email,
            avatar: '',
        })
    }

    return (
        <AuthContext.Provider value={{ user, singIn }}>
            {children}
        </AuthContext.Provider>
    )
}
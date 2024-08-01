import { UserDTO } from "@dtos/UsersDTO";
import { postSession, setDefaultHeaderAuthorizationToken } from "@services/sessions";
import { storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
    singIn: (email: string, password: string) => Promise<void>
    singOut: () => Promise<void>
    //updateUserProfile: (userUpdate: UserDTO) => Promise<void>
    isLoadingUserStorageData: boolean
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [ user, setUser ] = useState<UserDTO>({} as UserDTO);
    const [ isLoadingUserStorageData, setIsLoadingUserStotageData ] = useState(false);

    function userAndTokenUpdate(userData: UserDTO, token: string) {

    }

    async function singOut() {
        try {
            setIsLoadingUserStotageData(true);
            setUser({} as UserDTO)

            await storageUserRemove();
            await storageAuthTokenRemove();

        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStotageData(false)
        }
    }

    async function singIn(email: string, password: string) {
        try {
            const { user, token, refresh_token } = await postSession(email, password)

            if(!( user || token || refresh_token )) return
            
            setUser(user)
            
            storageUserSave(user);
            storageAuthTokenSave({ token, refresh_token })
            
            setDefaultHeaderAuthorizationToken(token)

        } catch (error) {
            throw error
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingUserStotageData(true)
            const userLogged = await storageUserGet()
            
            if(userLogged) {
                setUser(userLogged)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStotageData(false)
        }
    }

    useEffect(() => {
        loadUserData();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                singIn,
                singOut,
                isLoadingUserStorageData
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
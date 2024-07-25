import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { api } from "@services/api";
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken";
import { storageUserGet, storageUserRemover, storageUserSave } from "@storage/storageUser";

import type { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
    user: UserDTO
    singIn: (email: string, password: string) => Promise<void>
    singOut: () => Promise<void>
    isLoadingUserStorageData: boolean
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [ user, setUser ] = useState<UserDTO>({} as UserDTO);
    const [ isLoadingUserStorageData, setIsLoadingUserStorageData ] = useState(true);

    function userAndTokenUpdate(userData: UserDTO, token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
    }

    async function storageUserAndTokenSave(userData: UserDTO, token: string) {
        try {
            setIsLoadingUserStorageData(true);

            await storageUserSave(userData);
            await storageAuthTokenSave(token);
            
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function singIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', {email, password});
    
            if(data.user && data.token) {
                userAndTokenUpdate(data.user, data.token)
                await storageUserAndTokenSave(data.user, data.token)
            }
        } catch (error) {
            throw error;
        }
    }

    async function singOut() {
        try {
            setIsLoadingUserStorageData(true);

            setUser({} as UserDTO);
            await storageUserRemover();
            await storageAuthTokenRemove();
            
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true);

            const userLogged = await storageUserGet();
            const token = await storageAuthTokenGet();
    
            if(token && userLogged) {
                userAndTokenUpdate(userLogged, token)
            }          
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadUserData();
    }, [])

    return (
        <AuthContext.Provider value={{ user, singIn, singOut, isLoadingUserStorageData }}>
            {children}
        </AuthContext.Provider>
    )
}
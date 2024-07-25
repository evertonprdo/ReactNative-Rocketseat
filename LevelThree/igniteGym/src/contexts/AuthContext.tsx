import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { api } from "@services/api";
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken";
import { storageUserGet, storageUserRemover, storageUserSave } from "@storage/storageUser";

import type { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
    user: UserDTO
    singIn: (email: string, password: string) => Promise<void>
    singOut: () => Promise<void>
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>
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

    async function storageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
        try {
            setIsLoadingUserStorageData(true);

            await storageUserSave(userData);
            await storageAuthTokenSave({token, refresh_token});
            
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function singIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', {email, password});
    
            if(data.user && data.token && data.refresh_token) {
                userAndTokenUpdate(data.user, data.token)
                await storageUserAndTokenSave(data.user, data.token, data.refresh_token)
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

    async function updateUserProfile(userUpdated: UserDTO) {
        try {
            setUser(userUpdated);
            await storageUserSave(userUpdated);
            
        } catch (error) {
            throw error
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true);

            const userLogged = await storageUserGet();
            const { token } = await storageAuthTokenGet();
    
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

    useEffect(() => {
        const subscribe = api.registerInterceptTokenMenager(singOut);
        return () => {
            subscribe();
        }
    }, [singOut])

    return (
        <AuthContext.Provider value={{ user, singIn, singOut, updateUserProfile, isLoadingUserStorageData }}>
            {children}
        </AuthContext.Provider>
    )
}
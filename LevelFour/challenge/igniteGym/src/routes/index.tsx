import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { colors } from "@theme/colors";
import { Loading } from "@components/Loading";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { ToastProvider } from "@contexts/ToastContext";
import { useAuth } from "@hooks/useAuth";
import { useEffect, useState } from "react";
import { NotificationWillDisplayEvent, OneSignal, OSNotification } from "react-native-onesignal";
import { Notification } from "@components/Notification";

const linking = {
    prefixes: ["com.prdo.igniteGym://"],
    config: {
        screens: {
            home: {
                path: "/home"
            },
            exercise: {
                path: "/exercises/:exerciseId",
                parse: {
                    exerciseId: (exerciseId: string) => exerciseId
                }
            },
            singIn: {
                path: "/singIn",
            },
            NotFound: '/*'
        }
    }
}

export function Routes() {
    const { user, isLoadingUserStorageData } = useAuth();

    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    const [notification, setNotification] = useState<OSNotification>();

    useEffect(() => {
        const handleNotification = (event: NotificationWillDisplayEvent): void => {
            event.preventDefault()
            const response = event.getNotification()
            setNotification(response);
        }

        OneSignal.Notifications.addEventListener(
            "foregroundWillDisplay",
            handleNotification
        )

        return () => OneSignal.Notifications.removeEventListener(
            "foregroundWillDisplay",
            handleNotification
        )
    }, [])

    if (isLoadingUserStorageData) return <Loading />

    return (
        <View className="bg-gray-700 flex-1">
            <NavigationContainer theme={theme} linking={linking}>
                <ToastProvider>
                    {user.id ? <AppRoutes /> : <AuthRoutes />}

                    {notification?.title &&
                        <Notification
                            data={notification}
                            onClose={() => setNotification(undefined)}
                        />
                    }
                </ToastProvider>
            </NavigationContainer>
        </View>
    )
}
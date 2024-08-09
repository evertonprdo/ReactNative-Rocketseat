import { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { NotificationWillDisplayEvent, OneSignal, OSNotification } from 'react-native-onesignal';

import { colors } from '@theme/colors';

import { AppRoutes } from '@routes/app.routes';
import { Notification } from '@components/Notification';

const linking = {
  prefixes: ["com.prdo.igniteshoes://"],
  config: {
    screens: {
      details: {
        path: "/details/:productId",
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

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
  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification?.title &&
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      }
    </NavigationContainer>
  );
}
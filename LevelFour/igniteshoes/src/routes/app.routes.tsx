import { Ionicons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Cart } from '@screens/Cart';
import { Home } from '@screens/Home';
import { Details } from '@screens/Details';
import { colors } from '@theme/colors';
import twcolors from 'tailwindcss/colors'

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: twcolors.gray[800]
        },
      }}>
      <Screen
        name="products"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />
        }}
      />

      <Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => <Feather name="shopping-bag" size={24} color={color} />,
        }}
      />

      <Screen
        name="details"
        component={Details}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
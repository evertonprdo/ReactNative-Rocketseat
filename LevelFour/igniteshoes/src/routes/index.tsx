import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { colors } from '@theme/colors';

import { AppRoutes } from './app.routes';
import { useCart } from '@hooks/useCart';
import { Loading } from '@components/Loading';

export function Routes() {
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const { loading } = useCart()

  return (
    <NavigationContainer theme={theme}>
      { loading ? <Loading/> : <AppRoutes />}
    </NavigationContainer>
  );
}
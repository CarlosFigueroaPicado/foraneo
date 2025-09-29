import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { enableScreens } from 'react-native-screens';

import DetalleScreen from '../screens/Detalle';
import InicioMenuScreen from '../screens/InicioMenu';
import LoginScreen from '../screens/Login';
import PerfilScreen from '../screens/Perfil';

enableScreens();

export type RootStackParamList = {
  Login: undefined;
  InicioMenu: undefined;
  Detalle: undefined;
  Perfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF',
      },
    }),
    []
  );

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="InicioMenu" component={InicioMenuScreen} />
        <Stack.Screen name="Detalle" component={DetalleScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

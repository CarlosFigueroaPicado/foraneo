import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" options={{}} />
      <Stack.Screen name="SignIn" options={{}} />
      <Stack.Screen name="Index" options={{}} />
      <Stack.Screen name="Detalle" options={{}} />
      <Stack.Screen name="Perfil" options={{}} />
      <Stack.Screen name="sign-up" options={{ headerShown: true, title: 'Crear cuenta' }} />
    </Stack>
  );
}

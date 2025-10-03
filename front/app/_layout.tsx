import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignIn" options={{}} />
  <Stack.Screen name="Index" options={{}} />
  <Stack.Screen name="home" options={{}} />
      <Stack.Screen name="Detalle" options={{}} />
      <Stack.Screen name="Perfil" options={{}} />
    </Stack>
  );
}

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { View } from 'react-native';

export default function Layout() {
  const [loaded] = useFonts({
    BalooBold: require('../assets/fonts/Baloo2-Bold.ttf'),
    Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
    NunitoSemi: require('../assets/fonts/Nunito-SemiBold.ttf'),
  });

  if (!loaded) {
    return <View />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

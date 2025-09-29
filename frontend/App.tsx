import { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

import { RootNavigator } from './src/navigation';
import { AnimatedSplash } from './src/components/AnimatedSplash';
import './styles.css';

export default function App() {
  const [hasSplashCompleted, setHasSplashCompleted] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Light': require('./resources/Tipografía_Inter/Inter_18pt-Light.ttf'),
    'Inter-Regular': require('./resources/Tipografía_Inter/Inter_18pt-Regular.ttf'),
    'Inter-Medium': require('./resources/Tipografía_Inter/Inter_18pt-Medium.ttf'),
    'Inter-SemiBold': require('./resources/Tipografía_Inter/Inter_18pt-SemiBold.ttf'),
    'Inter-Bold': require('./resources/Tipografía_Inter/Inter_18pt-Bold.ttf'),
  });

  const isAppReady = useMemo(() => fontsLoaded && hasSplashCompleted, [fontsLoaded, hasSplashCompleted]);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => null);
  }, []);

  const handleSplashFinish = useCallback(async () => {
    setHasSplashCompleted(true);
  }, []);

  useEffect(() => {
    if (fontError) {
      console.warn('Error loading fonts:', fontError);
    }
  }, [fontError]);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync().catch(() => null);
    }
  }, [isAppReady]);

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-background-default">
        {!isAppReady && <AnimatedSplash onFinish={handleSplashFinish} />}
        {isAppReady && <RootNavigator />}
      </View>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

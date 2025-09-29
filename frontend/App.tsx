import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

import { RootNavigator } from './src/navigation';
import { AnimatedSplash } from './src/components/AnimatedSplash';
import './styles.css';

export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => null);
  }, []);

  const handleSplashFinish = useCallback(async () => {
    if (!isSplashFinished) {
      setIsSplashFinished(true);
      await SplashScreen.hideAsync().catch(() => null);
    }
  }, [isSplashFinished]);

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white">
        {!isSplashFinished && <AnimatedSplash onFinish={handleSplashFinish} />}
        {isSplashFinished && <RootNavigator />}
      </View>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

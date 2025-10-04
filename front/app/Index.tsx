import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedView = Animated.View;

export default function SplashScreen() {
  const router = useRouter();
  const progressValue = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const listenerId = progressValue.addListener(({ value }) => {
      setProgress(Math.min(100, Math.round(value)));
    });

    const animation = Animated.timing(progressValue, {
      toValue: 100,
      duration: 3500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });

    animation.start(({ finished }) => {
      if (finished) {
        router.replace('/(auth)/login');
      }
    });

    return () => {
      progressValue.removeListener(listenerId);
      animation.stop();
    };
  }, [progressValue, router]);

  const progressWidth = progressValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <LinearGradient colors={['#0F172A', '#1F2937']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1 }}
          className="items-center justify-center px-8"
        >
          <View className="w-full max-w-md rounded-3xl bg-white/10 p-4">
            <View className="w-full overflow-hidden rounded-2xl bg-black/20" style={{ aspectRatio: 16 / 9 }}>
              <Image
                source={require('../assets/animacion_logo.gif')}
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
          </View>

          <View className="mt-10 w-full max-w-md">
            <View className="h-3 w-full overflow-hidden rounded-full bg-white/20">
              <AnimatedView
                style={{
                  width: progressWidth,
                  height: '100%',
                  backgroundColor: '#22D3EE',
                  borderRadius: 999,
                }}
              />
            </View>
            <Text className="mt-3 text-center text-base font-semibold text-white">
              {progress}%
            </Text>
            <Text className="mt-1 text-center text-sm text-white/70">
              Preparando tu experiencia Foráneo...
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

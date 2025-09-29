import { useCallback, useEffect, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';

type AnimatedSplashProps = {
  onFinish: () => void;
};

export function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const videoRef = useRef<Video>(null);
  const hasFinishedRef = useRef(false);

  const handlePlaybackStatus = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) {
        if ('error' in status && status.error && !hasFinishedRef.current) {
          console.warn('AnimatedSplash error:', status.error);
          hasFinishedRef.current = true;
          onFinish();
        }
        return;
      }

      if (status.didJustFinish && !hasFinishedRef.current) {
        hasFinishedRef.current = true;
        onFinish();
      }
    },
    [onFinish]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasFinishedRef.current) {
        hasFinishedRef.current = true;
        onFinish();
      }
    }, 6000);

    return () => {
      clearTimeout(timeout);
      if (videoRef.current) {
        videoRef.current.stopAsync().catch(() => null);
      }
    };
  }, [onFinish]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Video
        ref={videoRef}
        source={require('../../resources/animacion_logo_2.mp4')}
        style={{ width: '100%', height: '100%' }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping={false}
        isMuted
        onPlaybackStatusUpdate={handlePlaybackStatus}
      />
      <View className="absolute bottom-10">
        <ActivityIndicator size="large" color="#1f2937" />
      </View>
    </View>
  );
}

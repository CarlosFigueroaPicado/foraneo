import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Creates a floating animation effect for elements.
 *
 * @param delay - Delay in milliseconds before starting the animation
 * @returns Animated.Value that can be used with transform: [{ translateY }]
 */
export function useFloatAnimation(delay: number = 0): Animated.Value {
  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(offset, {
          toValue: -8,
          duration: 1800,
          delay,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(offset, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    floatAnimation.start();

    return () => {
      floatAnimation.stop();
    };
  }, [offset, delay]);

  return offset;
}

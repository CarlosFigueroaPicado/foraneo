import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import PhoneIcon from '../../assets/icons/phone.svg';
import InstagramCamera from '../../assets/icons/instagram-camera.svg';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function AuthFloatingIcons() {
  const phoneOffset = useRef(new Animated.Value(0)).current;
  const cameraOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createFloatAnimation = (value: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: -8,
            duration: 2000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );

    const phoneLoop = createFloatAnimation(phoneOffset, 0);
    const cameraLoop = createFloatAnimation(cameraOffset, 600);

    phoneLoop.start();
    cameraLoop.start();

    return () => {
      phoneLoop.stop();
      cameraLoop.stop();
    };
  }, [cameraOffset, phoneOffset]);

  return (
    <View pointerEvents="none" style={styles.container}>
      <AnimatedView style={[styles.iconWrapper, styles.leftIcon, { transform: [{ translateY: phoneOffset }] }]}> 
        <PhoneIcon width={34} height={34} fill="rgba(255,255,255,0.85)" />
      </AnimatedView>
      <AnimatedView style={[styles.iconWrapper, styles.rightIcon, { transform: [{ translateY: cameraOffset }] }]}> 
        <InstagramCamera width={30} height={30} color="rgba(255,255,255,0.85)" />
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  iconWrapper: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    padding: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
  },
  leftIcon: {},
  rightIcon: {},
});

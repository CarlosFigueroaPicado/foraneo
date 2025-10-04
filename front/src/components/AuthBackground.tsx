import { ReactNode } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

interface AuthBackgroundProps {
  SvgBg: React.FC<SvgProps>;
  gifSource: ImageSourcePropType;
  children: ReactNode;
}

export default function AuthBackground({ SvgBg, gifSource, children }: AuthBackgroundProps) {
  return (
    <View style={styles.container}>
      <SvgBg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={styles.svg} />
      <Image source={gifSource} style={styles.overlay} resizeMode="cover" />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  content: {
    flex: 1,
  },
});

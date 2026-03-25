import { ReactElement } from 'react';
import { Animated, View } from 'react-native';
import { useFloatAnimation } from '../../hooks/useFloatAnimation';

const AnimatedView = Animated.createAnimatedComponent(View);

type FloatingIconProps = {
  icon: ReactElement;
  delay?: number;
};

/**
 * Single floating icon with animation.
 */
function FloatingIcon({ icon, delay = 0 }: FloatingIconProps) {
  const offset = useFloatAnimation(delay);

  return (
    <AnimatedView
      className="rounded-full border border-white/30 p-3"
      style={{ transform: [{ translateY: offset }] }}
    >
      {icon}
    </AnimatedView>
  );
}

type FloatingIconBarProps = {
  icons: { icon: ReactElement; delay?: number }[];
  className?: string;
};

/**
 * Displays a bar of floating icons with smooth animations.
 * Used for decorative animated elements in authentication screens.
 */
export function FloatingIconBar({ icons, className }: FloatingIconBarProps) {
  return (
    <View className={`pointer-events-none absolute bottom-6 left-0 right-0 flex-row items-center justify-between px-10 ${className || ''}`}>
      {icons.map((item, index) => (
        <FloatingIcon
          key={index}
          icon={item.icon}
          delay={item.delay !== undefined ? item.delay : index * 600}
        />
      ))}
    </View>
  );
}

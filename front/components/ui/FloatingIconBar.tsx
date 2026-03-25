import { ReactElement } from 'react';
import { Animated, View } from 'react-native';
import { useFloatAnimation } from '../../hooks/useFloatAnimation';

const AnimatedView = Animated.createAnimatedComponent(View);

type FloatingIcon = {
  icon: ReactElement;
  delay?: number;
};

type FloatingIconBarProps = {
  icons: FloatingIcon[];
  className?: string;
};

/**
 * Displays a bar of floating icons with smooth animations.
 * Used for decorative animated elements in authentication screens.
 */
export function FloatingIconBar({ icons, className }: FloatingIconBarProps) {
  return (
    <View className={`pointer-events-none absolute bottom-6 left-0 right-0 flex-row items-center justify-between px-10 ${className || ''}`}>
      {icons.map((item, index) => {
        const offset = useFloatAnimation(item.delay || index * 600);
        return (
          <AnimatedView
            key={index}
            className="rounded-full border border-white/30 p-3"
            style={{ transform: [{ translateY: offset }] }}
          >
            {item.icon}
          </AnimatedView>
        );
      })}
    </View>
  );
}

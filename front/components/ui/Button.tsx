import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

const baseClasses =
  'flex-row items-center justify-center rounded-3xl px-6 py-3 active:opacity-80 transition-all';

const variantMap = {
  primary: 'bg-primary',
  secondary: 'bg-background-subtle border border-primary/30',
  ghost: 'bg-transparent border border-neutral-200',
} as const;

const textColorMap: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-primary',
  ghost: 'text-neutral-900',
};

type ButtonVariant = keyof typeof variantMap;

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  className?: string;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  iconLeft,
  iconRight,
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <Pressable
      className={`${baseClasses} ${variantMap[variant]} ${disabled ? 'opacity-40' : ''} ${className}`.trim()}
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
    >
      {iconLeft ? <View className="mr-2">{iconLeft}</View> : null}
      <Text className={`text-center font-semibold ${textColorMap[variant]}`}>
        {label}
      </Text>
      {iconRight ? <View className="ml-2">{iconRight}</View> : null}
    </Pressable>
  );
}

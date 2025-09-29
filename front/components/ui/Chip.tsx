import { Pressable, Text } from 'react-native';

type ChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  className?: string;
};

export function Chip({ label, active = false, onPress, className = '' }: ChipProps) {
  const baseClasses =
    'mr-3 mb-3 flex-row items-center rounded-full border px-5 py-2 transition-colors active:opacity-80';
  const stateClasses = active
    ? 'border-primary bg-primary/10 text-primary'
    : 'border-neutral-200 bg-white text-neutral-500';

  return (
    <Pressable
      className={`${baseClasses} ${stateClasses} ${className}`.trim()}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text className="text-sm font-medium">{label}</Text>
    </Pressable>
  );
}

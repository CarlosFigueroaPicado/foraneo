import { Text, View } from 'react-native';

type InfoItemVariant = 'stat-pill' | 'info-pill' | 'preference-row';

type InfoItemProps = {
  label: string;
  value: string;
  variant?: InfoItemVariant;
  className?: string;
};

/**
 * A flexible component for displaying label-value pairs in different styles.
 *
 * Variants:
 * - stat-pill: Used in profile screens for stats (centered, rounded, on colored background)
 * - info-pill: Used in detail screens for metadata (uppercase label, styled pill)
 * - preference-row: Used for horizontal key-value pairs
 */
export function InfoItem({ label, value, variant = 'preference-row', className }: InfoItemProps) {
  if (variant === 'stat-pill') {
    return (
      <View className={`items-center rounded-2xl bg-white/25 px-3 py-2 ${className || ''}`}>
        <Text className="text-lg font-semibold text-white">{value}</Text>
        <Text className="text-xs text-white/80">{label}</Text>
      </View>
    );
  }

  if (variant === 'info-pill') {
    return (
      <View className={`mb-4 w-[48%] rounded-3xl bg-background-subtle px-4 py-3 ${className || ''}`}>
        <Text className="text-xs uppercase tracking-[1.5px] text-neutral-400">{label}</Text>
        <Text className="mt-1 text-base font-semibold text-neutral-900">{value}</Text>
      </View>
    );
  }

  // preference-row (default)
  return (
    <View className={`flex-row items-center justify-between ${className || ''}`}>
      <Text className="text-sm font-medium text-neutral-600">{label}</Text>
      <Text className="text-sm font-semibold text-neutral-900">{value}</Text>
    </View>
  );
}

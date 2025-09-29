import { View, Text } from 'react-native';

interface RatingBadgeProps {
  rating: number;
  reviews?: number;
}

export function RatingBadge({ rating, reviews }: RatingBadgeProps) {
  return (
    <View className="flex-row items-center rounded-full bg-white/90 px-3 py-1">
      <Text className="mr-1 font-semibold text-primary">★</Text>
      <Text className="font-medium text-neutral-900">{rating.toFixed(1)}</Text>
      {typeof reviews === 'number' ? (
        <Text className="ml-1 text-xs text-neutral-500">({reviews})</Text>
      ) : null}
    </View>
  );
}

import { ReactNode } from 'react';
import { View } from 'react-native';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return (
    <View className={`rounded-3xl bg-white p-5 drop-shadow-card ${className}`.trim()}>{children}</View>
  );
}

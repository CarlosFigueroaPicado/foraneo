import { ReactNode } from 'react';
import { View, Text } from 'react-native';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, action, className = '' }: SectionHeaderProps) {
  return (
    <View className={`mb-6 flex-row items-center justify-between ${className}`.trim()}>
      <View className="max-w-[75%]">
        <Text className="font-semibold text-neutral-900 text-xl">{title}</Text>
        {subtitle ? <Text className="mt-1 text-sm text-neutral-500">{subtitle}</Text> : null}
      </View>
      {action ? <View>{action}</View> : null}
    </View>
  );
}

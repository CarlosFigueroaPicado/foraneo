import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@theme';

export type ScreenProps = {
  children: ReactNode;
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
};

export function Screen({
  children,
  backgroundColor = colors.background,
  paddingHorizontal = spacing.lg,
  paddingVertical = spacing.xl,
}: ScreenProps) {
  return (
    <SafeAreaView
      style={[
        styles.base,
        {
          backgroundColor,
          paddingHorizontal,
          paddingVertical,
        },
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});

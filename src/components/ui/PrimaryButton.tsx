import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing, typography } from '@theme';

export type PrimaryButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  href?: string;
};

export function PrimaryButton({ children, onPress }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.base} accessibilityRole="button">
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + spacing.xs,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.backgroundAlt,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
});

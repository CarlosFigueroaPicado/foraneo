import type { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';

import { colors, spacing, typography } from '@theme';

export type LinkButtonProps = {
  children: ReactNode;
  href: string;
};

export function LinkButton({ children, href }: LinkButtonProps) {
  return (
    <Link
      href={href}
      style={styles.base}
      accessibilityRole="button"
      accessibilityHint="Navegar a otra sección"
    >
      <Text style={styles.label}>{children}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  base: {
    marginTop: spacing.xl,
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

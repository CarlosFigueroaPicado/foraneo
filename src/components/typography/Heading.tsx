import type { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors, typography } from '@theme';

export type HeadingProps = {
  children: ReactNode;
  level?: 1 | 2 | 3;
};

const sizeMap: Record<Required<HeadingProps>['level'], number> = {
  1: typography.sizes.display,
  2: typography.sizes.xl,
  3: typography.sizes.lg,
};

export function Heading({ children, level = 1 }: HeadingProps) {
  return <Text style={[styles.base, { fontSize: sizeMap[level] }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
    fontWeight: typography.weights.bold,
  },
});

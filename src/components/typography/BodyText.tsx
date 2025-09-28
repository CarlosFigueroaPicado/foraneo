import type { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors, spacing, typography } from '@theme';

export type BodyTextProps = {
  children: ReactNode;
  muted?: boolean;
  align?: 'left' | 'center' | 'right';
};

export function BodyText({ children, muted = false, align = 'left' }: BodyTextProps) {
  return (
    <Text style={[styles.base, muted && styles.muted, { textAlign: align }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
    fontSize: typography.sizes.md,
    lineHeight: typography.sizes.md + spacing.xs,
  },
  muted: {
    color: colors.textMuted,
  },
});

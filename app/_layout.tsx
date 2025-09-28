import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors, typography } from '@theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.backgroundAlt },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: typography.weights.semibold },
        }}
      />
    </>
  );
}

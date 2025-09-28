import { StatusBar } from 'expo-status-bar';

import { BodyText, Heading, LinkButton, Screen } from '@components';
import { colors, spacing } from '@theme';

export default function HomeScreen() {
  return (
    <Screen backgroundColor={colors.backgroundAlt} paddingHorizontal={spacing.xl} paddingVertical={spacing.xxl}>
      <StatusBar style="light" />
      <Heading level={1}>Foráneo</Heading>
      <BodyText muted>
        Explora experiencias auténticas y planifica tus viajes por Nicaragua desde una sola app móvil.
      </BodyText>
      <LinkButton href="/upcoming">Ver próximas funcionalidades</LinkButton>
    </Screen>
  );
}

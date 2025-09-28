import { Stack } from 'expo-router';

import { BodyText, Heading, Screen } from '@components';
import { spacing } from '@theme';

export default function UpcomingScreen() {
  return (
    <Screen paddingHorizontal={spacing.xl} paddingVertical={spacing.xl}>
      <Stack.Screen options={{ title: 'Hoja de ruta' }} />
      <Heading level={2}>Próximamente</Heading>
      <BodyText muted>
        Este es el punto de partida. Integraremos autenticación, catálogos de experiencias y un panel para proveedores
        conforme avancemos.
      </BodyText>
      <BodyText muted>
        Mientras tanto, conectaremos la aplicación con el backend para exponer métricas y disponibilidad en tiempo real.
      </BodyText>
    </Screen>
  );
}

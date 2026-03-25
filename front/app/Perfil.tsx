import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { profileShortcuts } from '../constants/content';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsive, useResponsiveValue } from '../hooks/useResponsive';

export default function PerfilScreen() {
  const { isMedium, isLarge, isXLarge } = useResponsive();
  const containerPadding = useResponsiveValue({ base: 24, md: 32, lg: 48, xl: 64 });
  const avatarSize = useResponsiveValue({ base: 96, md: 112, lg: 128 });
  const iconBoxSize = useResponsiveValue({ base: 64, md: 72, lg: 80 });

  // Use 3 columns for medium screens and 4 for large screens
  const shortcutWidth = isMedium ? '30%' : isLarge || isXLarge ? '22%' : '46%';

  return (
    <SafeAreaView className="flex-1 bg-background-default">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: containerPadding, paddingBottom: 48 }}>
        <Card className="items-center bg-accent-coral/95">
          <Image
            source={require('../resources/depositphotos_205163866-stock-photo-smiling-traveler-hat-backpack-tourist.jpg')}
            style={{ width: avatarSize, height: avatarSize }}
            className="rounded-full border-4 border-white"
          />
          <Text className="mt-4 text-xl font-semibold text-white">Adriana Méndez</Text>
          <Text className="mt-1 text-sm text-white/80">Exploradora cultural • Managua</Text>
          <View className="mt-4 flex-row space-x-4">
            <StatPill label="Reservas" value="12" />
            <StatPill label="Favoritos" value="28" />
            <StatPill label="Rutas creadas" value="4" />
          </View>
          <Button label="Editar perfil" variant="secondary" className="mt-6 self-stretch" />
        </Card>

        <View className="mt-10">
          <SectionHeader title="Accesos rápidos" subtitle="Gestiona tus actividades al instante" />
          <View className="-mx-2 flex-row flex-wrap">
            {profileShortcuts.map((shortcut) => (
              <Card key={shortcut.id} style={{ width: shortcutWidth }} className="mx-2 mb-4 items-center bg-background-subtle">
                <Text className="text-2xl">{shortcut.icon}</Text>
                <Text className="mt-2 text-sm font-medium text-neutral-700">{shortcut.label}</Text>
              </Card>
            ))}
          </View>
        </View>

        <View className="mt-10">
          <SectionHeader
            title="Logros de viajero"
            subtitle="Sigue desbloqueando badges con tus próximas experiencias"
          />
          <View className="space-y-4">
            <Card className="flex-row items-center bg-white">
              <View style={{ width: iconBoxSize, height: iconBoxSize }} className="mr-4 items-center justify-center rounded-3xl bg-primary/10">
                <Text className="text-2xl">🏅</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-neutral-900">Embajadora cultural</Text>
                <Text className="mt-1 text-sm text-neutral-500">
                  Participaste en 5 eventos oficiales de la agenda Foráneo.
                </Text>
              </View>
              <Text className="text-2xl">✓</Text>
            </Card>

            <Card className="flex-row items-center bg-white">
              <View style={{ width: iconBoxSize, height: iconBoxSize }} className="mr-4 items-center justify-center rounded-3xl bg-info/10">
                <Text className="text-2xl">🧭</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-neutral-900">Ruta personalizada</Text>
                <Text className="mt-1 text-sm text-neutral-500">
                  Crea una nueva ruta combinando cultura, gastronomía y aventura.
                </Text>
              </View>
              <Text className="text-xl text-primary">2/5</Text>
            </Card>
          </View>
        </View>

        <View className="mt-10">
          <SectionHeader title="Preferencias" subtitle="Personaliza tu feed y notificaciones" />
          <Card className="space-y-4 bg-white">
            <PreferenceRow primary="Idiomas" secondary="Español, Inglés" />
            <PreferenceRow primary="Notificaciones" secondary="Push y correo semanal" />
            <PreferenceRow primary="Intereses" secondary="Cultura, Gastronomía, Naturaleza" />
            <PreferenceRow primary="Método de pago" secondary="Visa terminación 4821" />
          </Card>
        </View>

        <View className="mt-12 items-center">
          <Text className="text-sm text-neutral-400">¿Necesitas ayuda? Escríbenos a soporte@foraneo.com</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <View className="items-center rounded-2xl bg-white/25 px-3 py-2">
      <Text className="text-lg font-semibold text-white">{value}</Text>
      <Text className="text-xs text-white/80">{label}</Text>
    </View>
  );
}

function PreferenceRow({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-sm font-medium text-neutral-600">{primary}</Text>
      <Text className="text-sm font-semibold text-neutral-900">{secondary}</Text>
    </View>
  );
}

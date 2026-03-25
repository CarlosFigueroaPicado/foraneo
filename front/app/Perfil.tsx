import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { InfoItem } from '../components/ui/InfoItem';
import { profileShortcuts } from '../constants/content';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PerfilScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-default">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 48 }}>
        <Card className="items-center bg-accent-coral/95">
          <Image
            source={require('../resources/depositphotos_205163866-stock-photo-smiling-traveler-hat-backpack-tourist.jpg')}
            className="h-24 w-24 rounded-full border-4 border-white"
          />
          <Text className="mt-4 text-xl font-semibold text-white">Adriana Méndez</Text>
          <Text className="mt-1 text-sm text-white/80">Exploradora cultural • Managua</Text>
          <View className="mt-4 flex-row space-x-4">
            <InfoItem label="Reservas" value="12" variant="stat-pill" />
            <InfoItem label="Favoritos" value="28" variant="stat-pill" />
            <InfoItem label="Rutas creadas" value="4" variant="stat-pill" />
          </View>
          <Button label="Editar perfil" variant="secondary" className="mt-6 self-stretch" />
        </Card>

        <View className="mt-10">
          <SectionHeader title="Accesos rápidos" subtitle="Gestiona tus actividades al instante" />
          <View className="-mx-2 flex-row flex-wrap">
            {profileShortcuts.map((shortcut) => (
              <Card key={shortcut.id} className="mx-2 mb-4 w-[46%] items-center bg-background-subtle">
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
              <View className="mr-4 h-16 w-16 items-center justify-center rounded-3xl bg-primary/10">
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
              <View className="mr-4 h-16 w-16 items-center justify-center rounded-3xl bg-info/10">
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
            <InfoItem label="Idiomas" value="Español, Inglés" variant="preference-row" />
            <InfoItem label="Notificaciones" value="Push y correo semanal" variant="preference-row" />
            <InfoItem label="Intereses" value="Cultura, Gastronomía, Naturaleza" variant="preference-row" />
            <InfoItem label="Método de pago" value="Visa terminación 4821" variant="preference-row" />
          </Card>
        </View>

        <View className="mt-12 items-center">
          <Text className="text-sm text-neutral-400">¿Necesitas ayuda? Escríbenos a soporte@foraneo.com</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

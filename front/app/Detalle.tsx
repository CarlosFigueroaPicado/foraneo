import { Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { RatingBadge } from '../components/ui/RatingBadge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { curatedActivities, experienceHighlights, heroEvents, sampleItinerary } from '../constants/content';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetalleScreen() {
  const navigation = useNavigation();
  const experience = heroEvents[0];
  const related = curatedActivities.slice(0, 2);

  return (
    <SafeAreaView className="flex-1 bg-background-default">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 48 }}>
        <ImageBackground
          source={experience.image}
          className="h-[360px] w-full overflow-hidden"
          imageStyle={{ resizeMode: 'cover' }}
        >
          <View className="flex-1 justify-between bg-neutral-900/25 px-6 py-6">
            <View className="flex-row justify-between">
              <Pressable
                onPress={() => navigation.goBack()}
                className="h-11 w-11 items-center justify-center rounded-full bg-white/90"
              >
                <Text className="text-lg text-neutral-800">←</Text>
              </Pressable>
              <View className="h-11 w-11 items-center justify-center rounded-full bg-white/90">
                <Text className="text-lg text-primary">♡</Text>
              </View>
            </View>

            <View>
              <RatingBadge rating={experience.rating} reviews={experience.reviews} />
              <Text className="mt-3 text-xs uppercase tracking-[2px] text-white/70">Experiencia cultural</Text>
              <Text className="mt-2 text-4xl font-display text-white leading-tight">{experience.title}</Text>
              <Text className="mt-3 text-base text-white/85">{experience.description}</Text>
              <View className="mt-4 flex-row items-center space-x-3">
                <View className="rounded-full bg-primary/90 px-3 py-1">
                  <Text className="text-xs font-semibold text-white">$12 por persona</Text>
                </View>
                <View className="rounded-full bg-white/30 px-3 py-1">
                  <Text className="text-xs font-medium text-white/90">Disponible todo el año</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View className="-mt-10 px-6">
          <Card className="-mb-4">
            <View className="flex-row flex-wrap justify-between">
              <InfoPill label="Duración" value="3 horas" />
              <InfoPill label="Horario" value="9:00 AM - 12:00 PM" />
              <InfoPill label="Idioma" value="Español / Inglés" />
              <InfoPill label="Capacidad" value="15 personas" />
            </View>
          </Card>
        </View>

        <View className="mt-12 px-6">
          <SectionHeader
            title="Lo que vivirás"
            subtitle="Momentos destacados que hacen única la experiencia"
          />
          <View className="space-y-4">
            {experienceHighlights.map((item) => (
              <Card key={item.id} className="flex-row items-start">
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Text className="text-xl">{item.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-neutral-900">{item.title}</Text>
                  <Text className="mt-2 text-sm text-neutral-500">{item.description}</Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        <View className="mt-12 px-6">
          <SectionHeader
            title="Itinerario sugerido"
            subtitle="Mantente a tiempo con este recorrido curado"
          />
          <Card>
            <View className="space-y-6">
              {sampleItinerary.map((block, index) => (
                <View key={block.id} className="flex-row">
                  <View className="items-center">
                    <Text className="text-sm font-semibold text-primary">{block.hour}</Text>
                    {index !== sampleItinerary.length - 1 ? (
                      <View className="mt-2 h-12 w-[1px] bg-primary/20" />
                    ) : null}
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-base font-semibold text-neutral-900">{block.title}</Text>
                    <Text className="mt-1 text-sm text-neutral-500">{block.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>

        <View className="mt-12 px-6">
          <SectionHeader title="Recomendado para ti" subtitle="Experiencias que combinan con este tour" />
          <View className="space-y-5">
            {related.map((item) => (
              <Card key={item.id} className="flex-row items-start">
                <Image source={item.image} className="mr-4 h-20 w-20 rounded-3xl" />
                <View className="flex-1">
                  <Text className="text-xs uppercase tracking-[1.5px] text-neutral-400">{item.category}</Text>
                  <Text className="mt-1 text-lg font-semibold text-neutral-900">{item.title}</Text>
                  <View className="mt-2 flex-row items-center justify-between">
                    <RatingBadge rating={item.rating} reviews={item.reviews} />
                    {item.price ? (
                      <Text className="text-sm font-semibold text-primary">{item.price}</Text>
                    ) : null}
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>

        <View className="mt-10 px-6">
          <Button label="Reservar experiencia" />
          <Text className="mt-3 text-center text-xs text-neutral-400">
            *Podrás reprogramar sin costo hasta 24 horas antes del evento.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-4 w-[48%] rounded-3xl bg-background-subtle px-4 py-3">
      <Text className="text-xs uppercase tracking-[1.5px] text-neutral-400">{label}</Text>
      <Text className="mt-1 text-base font-semibold text-neutral-900">{value}</Text>
    </View>
  );
}

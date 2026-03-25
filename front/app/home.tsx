import { Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';
import { RatingBadge } from '../components/ui/RatingBadge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { curatedActivities, heroEvents, quickFilters } from '../constants/content';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsive, useResponsiveValue } from '../hooks/useResponsive';

export default function HomeScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Todo');
  const { isMedium, isLarge, isXLarge } = useResponsive();

  // Responsive values
  const containerPadding = useResponsiveValue({ base: 24, md: 32, lg: 48, xl: 64 });
  const heroCardWidth = useResponsiveValue({ base: 224, md: 280, lg: 320 });
  const heroCardHeight = useResponsiveValue({ base: 256, md: 300, lg: 360 });
  const activityImageSize = useResponsiveValue({ base: 96, md: 112, lg: 128 });

  // Use grid layout for tablets and larger screens
  const useTwoColumns = isMedium || isLarge || isXLarge;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: containerPadding, paddingTop: 24 }}>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm">Buenos días, viajero</Text>
              <Text className="mt-1 text-2xl font-semibold text-neutral-900">¿Dónde quieres ir hoy?</Text>
            </View>
            <Pressable
              onPress={() => {
                router.push('/Perfil');
              }}
            >
              <Image
                source={require('../resources/icon.png')}
                className="h-12 w-12 rounded-full border-2 border-white drop-shadow-md"
              />
            </Pressable>
          </View>

          <ScrollView
            className="mt-6"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {heroEvents.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  if (item.category.toLowerCase() === 'cultura') {
                    router.push('/Detalle');
                  }
                }}
              >
                <ImageBackground
                  source={item.image}
                  style={{ width: heroCardWidth, height: heroCardHeight, marginRight: 16 }}
                  className="overflow-hidden rounded-4xl"
                  imageStyle={{ resizeMode: 'cover' }}
                >
                  <View className="flex-1 justify-between bg-neutral-900/25 p-5">
                    <View className="items-start">
                      <View className="rounded-full bg-white/80 px-3 py-1">
                        <Text className="text-xs font-medium text-neutral-700">{item.category}</Text>
                      </View>
                      <Text className="mt-3 text-2xl font-semibold text-white leading-tight">{item.title}</Text>
                      <Text className="mt-2 text-sm text-white/80" numberOfLines={3}>
                        {item.description}
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <RatingBadge rating={item.rating} reviews={item.reviews} />
                      {item.price ? <Text className="text-sm font-semibold text-white">{item.price}</Text> : null}
                    </View>
                  </View>
                </ImageBackground>
              </Pressable>
            ))}
          </ScrollView>

          <View className="mt-8">
            <SectionHeader
              title="Explora por categorías"
              subtitle="Filtra experiencias según tu mood de viaje"
              action={<Text className="text-sm font-semibold text-primary">Ver todo</Text>}
            />
            <View className="flex-row flex-wrap">
              {quickFilters.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  active={activeFilter === filter}
                  onPress={() => setActiveFilter(filter)}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={{ marginTop: 16, paddingHorizontal: containerPadding }}>
          <SectionHeader
            title="Curaduría de la semana"
            subtitle="Seleccionamos eventos imprescindibles para ti"
            action={<Text className="text-sm font-semibold text-primary">Ver calendario</Text>}
          />

          <View className={useTwoColumns ? 'flex-row flex-wrap -mx-2' : 'space-y-5'}>
            {curatedActivities.map((activity) => (
              <Card key={activity.id} className={useTwoColumns ? 'w-[48%] mx-2 mb-4' : ''}>
                <View className="flex-row items-start">
                  <Image
                    source={activity.image}
                    style={{ width: activityImageSize, height: activityImageSize }}
                    className="mr-4 rounded-3xl"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-xs uppercase tracking-[1.5px] text-neutral-400">
                        {activity.category}
                      </Text>
                      {activity.date ? (
                        <View className="rounded-full bg-primary/10 px-3 py-1">
                          <Text className="text-xs font-semibold text-primary">{activity.date}</Text>
                        </View>
                      ) : null}
                    </View>
                    <Text className="mt-2 text-xl font-semibold text-neutral-900">{activity.title}</Text>
                    <Text className="mt-2 text-sm text-neutral-500" numberOfLines={2}>
                      {activity.description}
                    </Text>
                    <View className="mt-3 flex-row items-center justify-between">
                      <RatingBadge rating={activity.rating} reviews={activity.reviews} />
                      {activity.price ? (
                        <Text className="text-sm font-semibold text-primary">{activity.price}</Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 32, paddingHorizontal: containerPadding }}>
          <Card className="items-center bg-primary/20">
            <Text className="text-xs uppercase tracking-[2px] text-neutral-800/80">Planificador Inteligente</Text>
            <Text className="mt-2 text-2xl font-semibold text-neutral-900 text-center">
              Diseña itinerarios personalizados con IA y recibe recomendaciones diarias.
            </Text>
            <Button label="Probar ahora" variant="secondary" className="mt-5 self-stretch" />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

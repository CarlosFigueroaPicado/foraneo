import { Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';
import { RatingBadge } from '../components/ui/RatingBadge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { curatedActivities, heroEvents, quickFilters } from '../constants/content';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InicioMenuScreen() {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('Todo');

  return (
    <SafeAreaView className="flex-1 bg-background-default">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-6 pt-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm">Buenos días, viajero</Text>
              <Text className="mt-1 text-2xl font-semibold text-neutral-900">¿Dónde quieres ir hoy?</Text>
            </View>
            <Pressable onPress={() => {
              navigation.navigate('Perfil');
            }}>
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
              <ImageBackground
                key={item.id}
                source={item.image}
                className="mr-4 h-64 w-56 overflow-hidden rounded-4xl"
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

        <View className="mt-4 px-6">
          <SectionHeader
            title="Curaduría de la semana"
            subtitle="Seleccionamos eventos imprescindibles para ti"
            action={<Text className="text-sm font-semibold text-primary">Ver calendario</Text>}
          />

          <View className="space-y-5">
            {curatedActivities.map((activity) => (
              <Card key={activity.id}>
                <View className="flex-row items-start">
                  <Image
                    source={activity.image}
                    className="mr-4 h-24 w-24 rounded-3xl"
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

        <View className="mt-8 px-6">
          <Card className="items-center bg-accent-navy">
            <Text className="text-xs uppercase tracking-[2px] text-white/80">Planificador Inteligente</Text>
            <Text className="mt-2 text-2xl font-semibold text-white text-center">
              Diseña itinerarios personalizados con IA y recibe recomendaciones diarias.
            </Text>
            <Button label="Probar ahora" variant="secondary" className="mt-5 self-stretch" />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

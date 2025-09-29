import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function PerfilScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 justify-center px-6 py-12">
          <Text className="text-3xl font-semibold text-neutral-900">Perfil</Text>
          <Text className="mt-4 text-base text-neutral-600">
            Aquí se incluirán los componentes de identidad, preferencias y acciones del usuario según Figma.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

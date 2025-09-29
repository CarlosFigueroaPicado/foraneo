import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 items-center justify-center px-6 py-12">
          <Text className="text-3xl font-semibold text-neutral-900">Accede a tu cuenta</Text>
          <Text className="mt-4 text-base text-neutral-600 text-center">
            Esta pantalla se ajustará a los componentes e ilustraciones definidos en el diseño de Figma.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

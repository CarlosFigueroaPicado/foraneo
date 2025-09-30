import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function SignUpScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-2xl font-semibold text-neutral-800">
          Pantalla de registro en construcción
        </Text>
        <Text className="mt-3 text-center text-base text-neutral-500">
          Muy pronto podrás crear tu cuenta Foráneo desde aquí.
        </Text>
      </View>
    </SafeAreaView>
  );
}

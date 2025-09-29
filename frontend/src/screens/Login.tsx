import { ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/ui/Button';
import { InputField } from '../components/ui/InputField';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-default">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} className="flex-1">
        <View>
          <ImageBackground
            source={require('../../resources/Login-19.png')}
            className="h-80 w-full overflow-hidden rounded-b-4xl"
            imageStyle={{ resizeMode: 'cover' }}
          >
            <View className="flex-1 justify-between bg-navy/40 px-6 py-8">
              <View>
                <Text className="text-xs uppercase tracking-[2px] text-white/80">Explora Nicaragua</Text>
                <Text className="mt-2 text-4xl font-display text-white leading-tight">
                  Vive experiencias inolvidables
                </Text>
              </View>
              <View className="rounded-3xl bg-white/20 px-4 py-3">
                <Text className="text-sm text-white/90">
                  Crea tu plan de viaje personalizado, descubre eventos culturales y encuentra tu próxima aventura.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View className="mx-6 -mt-10 rounded-4xl bg-white px-6 py-8 shadow-2xl">
          <Text className="text-3xl font-semibold text-neutral-900">Inicia sesión</Text>
          <Text className="mt-2 text-base text-neutral-500">
            Ingresa tus credenciales para continuar explorando Foráneo.
          </Text>

          <InputField className="mt-6" label="Correo electrónico" keyboardType="email-address" placeholder="tu@correo.com" />
          <InputField className="mt-4" label="Contraseña" secureTextEntry placeholder="••••••••" helperText="Debe contener al menos 8 caracteres" />

          <View className="mt-3 items-end">
            <Text className="text-sm font-medium text-primary">¿Olvidaste tu contraseña?</Text>
          </View>

          <Button label="Ingresar" className="mt-6" />

          <View className="mt-8 flex-row items-center justify-center">
            <Text className="text-sm text-neutral-500">¿Aún no tienes cuenta?</Text>
            <Text className="ml-2 text-sm font-semibold text-primary">Crea una ahora</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

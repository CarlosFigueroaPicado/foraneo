import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Feather, FontAwesome } from '@expo/vector-icons';

const gradientColors = ['#34D399', '#FACC15', '#22D3EE'] as const;
const buttonColor = '#2E3192';
const aquaAccent = '#37CFE3';
const primaryText = '#111827';
const subtleText = '#9CA3AF';
const placeholderColor = '#D1D5DB';

const cardShadow = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 18,
  elevation: 6,
};

const AnimatedView = Animated.createAnimatedComponent(View);

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const phoneOffset = useRef(new Animated.Value(0)).current;
  const calendarOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createFloatAnimation = (value: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: -8,
            duration: 1800,
            delay,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );

    const phoneLoop = createFloatAnimation(phoneOffset, 0);
    const calendarLoop = createFloatAnimation(calendarOffset, 600);

    phoneLoop.start();
    calendarLoop.start();

    return () => {
      phoneLoop.stop();
      calendarLoop.stop();
    };
  }, [phoneOffset, calendarOffset]);

  const [fontsLoaded] = useFonts({
    Baloo2_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      setFormError('Por favor, completa tu correo y contraseña para continuar.');
      return;
    }

    setFormError(null);
    console.log('Iniciando sesión con', { email });
    router.replace('/');
  };

  if (!fontsLoaded) {
    return (
      <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
        <SafeAreaView className="flex-1 items-center justify-center bg-black/10">
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text className="mt-4 text-base text-white/80">Cargando estilos...</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 120 }}
            className="flex-1"
          >
            <View className="px-6 pt-16">
              <Text
                className="text-center text-3xl text-white"
                style={{ fontFamily: 'Baloo2_700Bold' }}
              >
                BIENVENIDO A FORÁNEO
              </Text>
              <Text
                className="mt-6 text-center text-base text-white/85"
                style={{ fontFamily: 'Inter_400Regular' }}
              >
                Descubre experiencias únicas y planifica tus aventuras con nosotros.
              </Text>
            </View>

            <View className="px-6 pt-10">
              <View
                className="rounded-[24px] bg-white/95 p-6"
                style={cardShadow}
              >
                <Text
                  className="text-center text-base"
                  style={{ fontFamily: 'Inter_600SemiBold', color: aquaAccent }}
                >
                  INICIAR SESIÓN
                </Text>
                <Text
                  className="mt-2 text-center text-sm"
                  style={{ fontFamily: 'Inter_400Regular', color: subtleText }}
                >
                  Ingresa tus datos para continuar explorando el mundo Foráneo.
                </Text>

                <View className="mt-6 space-y-4">
                  <View>
                    <Text
                      className="text-sm"
                      style={{ fontFamily: 'Inter_600SemiBold', color: primaryText }}
                    >
                      Correo electrónico
                    </Text>
                    <TextInput
                      value={email}
                      onChangeText={(value) => {
                        setEmail(value);
                        if (formError) setFormError(null);
                      }}
                      keyboardType="email-address"
                      inputMode="email"
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="tu@correo.com"
                      placeholderTextColor={placeholderColor}
                      className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base"
                      style={{ fontFamily: 'Inter_400Regular', color: primaryText }}
                      accessibilityLabel="Campo para ingresar correo electrónico"
                    />
                  </View>

                  <View>
                    <Text
                      className="text-sm"
                      style={{ fontFamily: 'Inter_600SemiBold', color: primaryText }}
                    >
                      Contraseña
                    </Text>
                    <TextInput
                      value={password}
                      onChangeText={(value) => {
                        setPassword(value);
                        if (formError) setFormError(null);
                      }}
                      secureTextEntry
                      placeholder="Ingresa tu contraseña"
                      placeholderTextColor={placeholderColor}
                      className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base"
                      style={{ fontFamily: 'Inter_400Regular', color: primaryText }}
                      accessibilityLabel="Campo para ingresar contraseña"
                    />
                  </View>
                </View>

                <Pressable
                  onPress={handleSignIn}
                  accessibilityRole="button"
                  accessibilityLabel="Iniciar sesión en la aplicación Foráneo"
                  className="mt-6 rounded-xl px-4 py-3"
                  style={{ backgroundColor: buttonColor }}
                >
                  <Text
                    className="text-center text-base text-white"
                    style={{ fontFamily: 'Inter_600SemiBold' }}
                  >
                    Iniciar Sesión
                  </Text>
                </Pressable>

                {formError ? (
                  <Text
                    className="mt-3 text-center text-sm"
                    style={{ fontFamily: 'Inter_600SemiBold', color: '#F97316' }}
                  >
                    {formError}
                  </Text>
                ) : null}

                <View className="mt-6 flex-row items-center justify-center">
                  <Text
                    className="text-sm"
                    style={{ fontFamily: 'Inter_400Regular', color: subtleText }}
                  >
                    ¿No tienes cuenta?
                  </Text>
                  <Link
                    href="/sign-up"
                    className="ml-2 text-sm"
                    style={{ fontFamily: 'Inter_600SemiBold', color: aquaAccent }}
                  >
                    REGÍSTRATE AQUÍ
                  </Link>
                </View>
              </View>
            </View>
          </ScrollView>

          <View className="pointer-events-none absolute bottom-10 left-0 right-0 flex-row justify-between px-10">
            <AnimatedView
              className="rounded-full border border-white/30 p-3"
              style={{ transform: [{ translateY: phoneOffset }] }}
            >
              <Feather name="phone" size={24} color="rgba(255,255,255,0.8)" />
            </AnimatedView>
            <AnimatedView
              className="rounded-full border border-white/30 p-3"
              style={{ transform: [{ translateY: calendarOffset }] }}
            >
              <FontAwesome name="calendar" size={24} color="rgba(255,255,255,0.8)" />
            </AnimatedView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

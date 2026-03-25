import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import PhoneIllustration from '../resources/login y registro/teléfono.svg';
import { colors, shadows, fontFamilies } from '../constants/theme';
import { useAppFonts } from '../hooks/useAppFonts';
import { KeyboardSafeContainer } from '../components/ui/KeyboardSafeContainer';
import { FloatingIconBar } from '../components/ui/FloatingIconBar';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fontsLoaded = useAppFonts();

  const handleSignIn = () => {
  router.replace('/home');
  };

  if (!fontsLoaded) {
    return (
      <LinearGradient colors={colors.gradientColors} style={{ flex: 1 }}>
        <SafeAreaView className="flex-1 items-center justify-center bg-black/10">
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text className="mt-4 text-base text-white/80">Cargando estilos...</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={colors.gradientColors} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <View pointerEvents="none" className="absolute inset-0">
          <Image
            source={require('../resources/login y registro/GIF patron login.gif')}
            className="h-full w-full opacity-30"
            resizeMode="cover"
          />
        </View>

        <KeyboardSafeContainer>
          <View className="flex-1 px-6 pt-16 pb-28">
            <View className="items-center">
              <Text
                className="text-center text-2xl text-white"
                style={{ fontFamily: fontFamilies.baloo2Bold }}
              >
                BIENVENIDO A FORÁNEO
              </Text>
            </View>

            <View className="mt-10 flex-1 justify-center">
              <View
                className="rounded-[24px] bg-white/95 p-6"
                style={shadows.cardShadow}
              >
                <Text
                  className="text-center text-sm"
                  style={{ fontFamily: fontFamilies.interSemiBold, color: colors.aquaAccent }}
                >
                  INICIAR SESIÓN
                </Text>
                <Text
                  className="mt-2 text-center text-xs"
                  style={{ fontFamily: fontFamilies.interRegular, color: colors.subtleText }}
                >
                  Ingresa tus datos para continuar explorando el mundo Foráneo.
                </Text>

                <View className="mt-6 space-y-4">
                  <View>
                    <Text
                      className="text-xs"
                      style={{ fontFamily: fontFamilies.interSemiBold, color: colors.primaryText }}
                    >
                      Correo electrónico
                    </Text>
                    <TextInput
                      value={email}
                      onChangeText={(value) => {
                        setEmail(value);
                      }}
                      keyboardType="email-address"
                      inputMode="email"
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="tu@correo.com"
                      placeholderTextColor={colors.placeholderColor}
                      className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm"
                      style={{ fontFamily: fontFamilies.interRegular, color: colors.primaryText }}
                      accessibilityLabel="Campo para ingresar correo electrónico"
                    />
                  </View>

                  <View>
                    <Text
                      className="text-xs"
                      style={{ fontFamily: fontFamilies.interSemiBold, color: colors.primaryText }}
                    >
                      Contraseña
                    </Text>
                    <TextInput
                      value={password}
                      onChangeText={(value) => {
                        setPassword(value);
                      }}
                      secureTextEntry
                      placeholder="Ingresa tu contraseña"
                      placeholderTextColor={colors.placeholderColor}
                      className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm"
                      style={{ fontFamily: fontFamilies.interRegular, color: colors.primaryText }}
                      accessibilityLabel="Campo para ingresar contraseña"
                    />
                  </View>
                </View>

                <Pressable
                  onPress={handleSignIn}
                  accessibilityRole="button"
                  accessibilityLabel="Iniciar sesión en la aplicación Foráneo"
                  className="mt-6 rounded-xl px-4 py-3"
                  style={{ backgroundColor: colors.buttonColor }}
                >
                  <Text
                    className="text-center text-sm text-white"
                    style={{ fontFamily: fontFamilies.interSemiBold }}
                  >
                    Iniciar Sesión
                  </Text>
                </Pressable>

                <View className="mt-6 flex-row items-center justify-center">
                  <Text
                    className="text-xs"
                    style={{ fontFamily: fontFamilies.interRegular, color: colors.subtleText }}
                  >
                    ¿No tienes cuenta?
                  </Text>
                  <Link
                    href="/sign-up"
                    className="ml-2 text-xs"
                    style={{ fontFamily: fontFamilies.interSemiBold, color: colors.aquaAccent }}
                  >
                    REGÍSTRATE AQUÍ
                  </Link>
                </View>
              </View>
            </View>
          </View>

          <FloatingIconBar
            icons={[
              {
                icon: <PhoneIllustration width={32} height={32} fill="#FFFFFF" style={{ opacity: 0.85 }} />,
                delay: 0,
              },
              {
                icon: <Feather name="camera" size={24} color="rgba(255,255,255,0.8)" />,
                delay: 600,
              },
            ]}
          />
        </KeyboardSafeContainer>
      </SafeAreaView>
    </LinearGradient>
  );
}

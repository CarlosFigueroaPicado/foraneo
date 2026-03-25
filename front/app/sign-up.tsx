import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PhoneIllustration from '../resources/login y registro/teléfono.svg';
import { colors, shadows, fontFamilies } from '../constants/theme';
import { useAppFonts } from '../hooks/useAppFonts';
import { KeyboardSafeContainer } from '../components/ui/KeyboardSafeContainer';
import { FloatingIconBar } from '../components/ui/FloatingIconBar';

const REGISTER_URL = 'https://api.tu-dominio.com/auth/register'; // TODO: Reemplazar con la URL real del backend.

const countries = [
  { code: 'NI', name: 'Nicaragua' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'HN', name: 'Honduras' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'PA', name: 'Panamá' },
  { code: 'MX', name: 'México' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'ES', name: 'España' },
] as const;

type SignUpFormValues = {
  email: string;
  password: string;
  username: string;
  birthdate: string;
  country: string;
};

export default function SignUpScreen() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);

  const { control, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      birthdate: '',
      country: '',
    },
    mode: 'onChange',
  });

  const orderedCountries = useMemo(() => {
    return [...countries].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const fontsLoaded = useAppFonts();

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        reset();
        // TODO: Persistir token en expo-secure-store y navegar a /onboarding o /home según corresponda.
        router.replace('/SignIn');
        return;
      }
    } catch (error) {
      // TODO: Manejar errores de red según los requisitos del producto.
    }
  };

  const handleUsernameInput = (rawValue: string, onChange: (value: string) => void) => {
    const trimmed = rawValue.replace(/\s+/g, '');
    const withoutAt = trimmed.replace(/^@+/, '');
    const sanitized = withoutAt.replace(/[^A-Za-z0-9_.]/g, '');
    const nextValue = sanitized ? `@${sanitized}` : '';
    onChange(nextValue);
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
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 160 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 px-6 pt-16">
              <View className="items-center">
                <Text
                  className="text-center text-2xl text-white"
                  style={{ fontFamily: fontFamilies.baloo2Bold }}
                >
                  CREA TU EXPERIENCIA FORÁNEA
                </Text>
              </View>

              <View className="mt-10 flex-1">
                <View className="rounded-[24px] bg-white/95 p-6" style={shadows.cardShadow}>
                  <Text
                    className="text-center text-sm"
                    style={{ fontFamily: fontFamilies.interSemiBold, color: colors.aquaAccent }}
                  >
                    CREAR CUENTA
                  </Text>
                  <Text
                    className="mt-2 text-center text-xs"
                    style={{ fontFamily: fontFamilies.interRegular, color: colors.helperText }}
                  >
                    Regístrate para planear tu próximo viaje.
                  </Text>

                  <View className="mt-6 space-y-4">
                    <View>
                      <Text
                        className="text-xs"
                        style={{ color: colors.primaryText, fontFamily: fontFamilies.interSemiBold }}
                      >
                        Correo electrónico
                      </Text>
                      <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType="email-address"
                            inputMode="email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="tu@correo.com"
                            placeholderTextColor={colors.placeholderColor}
                            className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm"
                            style={{ color: colors.primaryText, fontFamily: fontFamilies.interRegular }}
                            accessibilityLabel="Campo para ingresar correo electrónico"
                          />
                        )}
                      />
                    </View>

                    <View>
                      <Text
                        className="text-xs"
                        style={{ color: colors.primaryText, fontFamily: fontFamilies.interSemiBold }}
                      >
                        Contraseña
                      </Text>
                      <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <View className="mt-2 flex-row items-center rounded-xl border border-[#E5E7EB] bg-white px-4">
                            <TextInput
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              placeholder="Ingresa tu contraseña"
                              placeholderTextColor={colors.placeholderColor}
                              secureTextEntry={!isPasswordVisible}
                              className="flex-1 py-3 text-sm"
                              style={{ color: colors.primaryText, fontFamily: fontFamilies.interRegular }}
                              accessibilityLabel="Campo para ingresar contraseña"
                              autoCapitalize="none"
                            />
                            <Pressable
                              onPress={() => setIsPasswordVisible((prev) => !prev)}
                              hitSlop={12}
                              accessibilityRole="button"
                              accessibilityLabel={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                              <Feather
                                name={isPasswordVisible ? 'eye-off' : 'eye'}
                                size={20}
                                color={colors.placeholderColor}
                              />
                            </Pressable>
                          </View>
                        )}
                      />
                    </View>

                    <View>
                      <Text
                        className="text-xs"
                        style={{ color: colors.primaryText, fontFamily: fontFamilies.interSemiBold }}
                      >
                        Nombre de usuario
                      </Text>
                      <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={(text) => handleUsernameInput(text, onChange)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="@usuario"
                            placeholderTextColor={colors.placeholderColor}
                            className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm"
                            style={{ color: colors.primaryText, fontFamily: fontFamilies.interRegular }}
                            accessibilityLabel="Campo para ingresar nombre de usuario"
                          />
                        )}
                      />
                    </View>

                    <View>
                      <Text
                        className="text-xs"
                        style={{ color: colors.primaryText, fontFamily: fontFamilies.interSemiBold }}
                      >
                        Fecha de nacimiento
                      </Text>
                      <Controller
                        control={control}
                        name="birthdate"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="DD/MM/YY"
                            placeholderTextColor={colors.placeholderColor}
                            keyboardType="number-pad"
                            className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm"
                            style={{ color: colors.primaryText, fontFamily: fontFamilies.interRegular }}
                            accessibilityLabel="Campo para ingresar fecha de nacimiento"
                          />
                        )}
                      />
                    </View>

                    <View>
                      <Text
                        className="text-xs"
                        style={{ color: colors.primaryText, fontFamily: fontFamilies.interSemiBold }}
                      >
                        País
                      </Text>
                      <Controller
                        control={control}
                        name="country"
                        render={({ field: { value } }) => (
                          <Pressable
                            onPress={() => setCountryModalVisible(true)}
                            className="mt-2 flex-row items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-4 py-3"
                            accessibilityRole="button"
                            accessibilityLabel="Seleccionar país"
                          >
                            <Text
                              className="text-sm"
                              style={{ color: value ? colors.primaryText : colors.placeholderColor, fontFamily: fontFamilies.interRegular }}
                            >
                              {value || 'Selecciona tu país'}
                            </Text>
                            <Feather name="chevron-down" size={20} color={colors.placeholderColor} />
                          </Pressable>
                        )}
                      />
                    </View>
                  </View>

                  <Pressable
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="mt-6 rounded-xl px-4 py-3"
                    style={{
                      backgroundColor: colors.buttonColor,
                      opacity: isSubmitting ? 0.6 : 1,
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Crear cuenta en Foráneo"
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text
                        className="text-center text-sm text-white"
                        style={{ fontFamily: fontFamilies.interSemiBold }}
                      >
                        Crear cuenta
                      </Text>
                    )}
                  </Pressable>

                  <View className="mt-6 flex-row items-center justify-center">
                    <Text
                      className="text-xs"
                      style={{ color: colors.helperText, fontFamily: fontFamilies.interRegular }}
                    >
                      ¿Ya tienes cuenta?
                    </Text>
                    <Pressable
                      onPress={() => router.replace('/SignIn')}
                      className="ml-2"
                      accessibilityRole="link"
                      accessibilityLabel="Ir a la pantalla de inicio de sesión"
                    >
                      <Text
                        className="text-xs"
                        style={{ color: colors.aquaAccent, fontFamily: fontFamilies.interSemiBold }}
                      >
                        Inicia sesión
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <FloatingIconBar
            icons={[
              {
                icon: <PhoneIllustration width={32} height={32} fill="#FFFFFF" style={{ opacity: 0.85 }} />,
                delay: 0,
              },
              {
                icon: <Feather name="map-pin" size={24} color="rgba(255,255,255,0.8)" />,
                delay: 600,
              },
            ]}
          />

          <Modal
            visible={countryModalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setCountryModalVisible(false)}
          >
            <View className="flex-1 bg-black/50 justify-end">
              <View className="max-h-[60%] rounded-t-3xl bg-white p-6">
                <Text
                  className="text-lg text-neutral-900"
                  style={{ fontFamily: fontFamilies.interSemiBold }}
                >
                  Selecciona tu país
                </Text>
                <FlatList
                  data={orderedCountries}
                  keyExtractor={(item) => item.code}
                  className="mt-4"
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setValue('country', item.name);
                        setCountryModalVisible(false);
                      }}
                      className="rounded-xl px-4 py-3"
                      accessibilityRole="button"
                      accessibilityLabel={`Seleccionar ${item.name}`}
                    >
                      <Text
                        className="text-sm text-neutral-800"
                        style={{ fontFamily: fontFamilies.interRegular }}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  )}
                  ItemSeparatorComponent={() => <View className="h-px bg-neutral-100" />}
                />
                <Pressable
                  onPress={() => setCountryModalVisible(false)}
                  className="mt-4 rounded-xl bg-neutral-100 px-4 py-3"
                  accessibilityRole="button"
                  accessibilityLabel="Cerrar selección de país"
                >
                  <Text
                    className="text-center text-sm text-neutral-700"
                    style={{ fontFamily: fontFamilies.interSemiBold }}
                  >
                    Cerrar
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </KeyboardSafeContainer>
      </SafeAreaView>
    </LinearGradient>
  );
}

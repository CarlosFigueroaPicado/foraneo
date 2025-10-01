import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
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

const REGISTER_URL = 'https://api.tu-dominio.com/auth/register'; // TODO: Reemplazar con la URL real del backend.

const gradientColors = ['#34D399', '#FACC15', '#22D3EE'] as const;
const cardShadow = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 18,
  elevation: 6,
};

const labelColor = '#111827';
const helperColor = '#6B7280';
const placeholderColor = '#9CA3AF';

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

  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 px-6 pt-16 pb-12">
              <View className="items-center">
                <Text className="text-center text-3xl text-white font-semibold">
                  CREA TU EXPERIENCIA FORÁNEA
                </Text>
              </View>

              <View className="mt-10 flex-1">
                <View className="rounded-[24px] bg-white/95 p-6" style={cardShadow}>
                  <Text
                    className="text-center text-base"
                    style={{ color: '#37CFE3', fontWeight: '600' }}
                  >
                    CREAR CUENTA
                  </Text>
                  <Text
                    className="mt-2 text-center text-sm"
                    style={{ color: helperColor }}
                  >
                    Regístrate para planear tu próximo viaje.
                  </Text>

                  <View className="mt-6 space-y-4">
                    <View>
                      <Text className="text-sm" style={{ color: labelColor, fontWeight: '600' }}>
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
                            placeholderTextColor={placeholderColor}
                            className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base"
                            style={{ color: labelColor }}
                            accessibilityLabel="Campo para ingresar correo electrónico"
                          />
                        )}
                      />
                    </View>

                    <View>
                      <Text className="text-sm" style={{ color: labelColor, fontWeight: '600' }}>
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
                              placeholderTextColor={placeholderColor}
                              secureTextEntry={!isPasswordVisible}
                              className="flex-1 py-3 text-base"
                              style={{ color: labelColor }}
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
                                color={placeholderColor}
                              />
                            </Pressable>
                          </View>
                        )}
                      />
                    </View>

                    <View>
                      <Text className="text-sm" style={{ color: labelColor, fontWeight: '600' }}>
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
                            placeholderTextColor={placeholderColor}
                            className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base"
                            style={{ color: labelColor }}
                            accessibilityLabel="Campo para ingresar nombre de usuario"
                          />
                        )}
                      />
                    </View>

                    <View>
                      <Text className="text-sm" style={{ color: labelColor, fontWeight: '600' }}>
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
                            placeholderTextColor={placeholderColor}
                            keyboardType="number-pad"
                            className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-base"
                            style={{ color: labelColor }}
                            accessibilityLabel="Campo para ingresar fecha de nacimiento"
                          />
                        )}
                      />
                    </View>

                    <View>
                      <Text className="text-sm" style={{ color: labelColor, fontWeight: '600' }}>
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
                              className="text-base"
                              style={{ color: value ? labelColor : placeholderColor }}
                            >
                              {value || 'Selecciona tu país'}
                            </Text>
                            <Feather name="chevron-down" size={20} color={placeholderColor} />
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
                      backgroundColor: '#2E3192',
                      opacity: isSubmitting ? 0.6 : 1,
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Crear cuenta en Foráneo"
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text className="text-center text-base text-white font-semibold">Crear cuenta</Text>
                    )}
                  </Pressable>

                  <View className="mt-6 flex-row items-center justify-center">
                    <Text className="text-sm" style={{ color: helperColor }}>
                      ¿Ya tienes cuenta?
                    </Text>
                    <Pressable
                      onPress={() => router.replace('/SignIn')}
                      className="ml-2"
                      accessibilityRole="link"
                      accessibilityLabel="Ir a la pantalla de inicio de sesión"
                    >
                      <Text className="text-sm font-semibold" style={{ color: '#37CFE3' }}>
                        Inicia sesión
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <Modal
            visible={countryModalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setCountryModalVisible(false)}
          >
            <View className="flex-1 bg-black/50 justify-end">
              <View className="max-h-[60%] rounded-t-3xl bg-white p-6">
                <Text className="text-lg font-semibold text-neutral-900">Selecciona tu país</Text>
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
                      <Text className="text-base text-neutral-800">{item.name}</Text>
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
                  <Text className="text-center text-base text-neutral-700">Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

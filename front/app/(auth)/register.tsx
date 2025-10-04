import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthBackground from '../../src/components/AuthBackground';
import AuthFloatingIcons from '../../src/components/AuthFloatingIcons';
import LoginBg from '../../assets/login.svg';
import { supabase } from '../../src/lib/supabase';

const primaryText = '#111827';
const helperText = '#6B7280';
const buttonColor = '#2E3192';
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

const countryNames = countries.map((country) => country.name as string);

const signUpSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Ingresa un correo válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Debe incluir letras y números'),
  username: z
    .string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .regex(/^@?[A-Za-z0-9._]+$/, 'Solo puedes usar letras, números, guiones bajos y puntos'),
  birthdate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Usa el formato DD/MM/AAAA')
    .refine((value) => {
      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      if (Number.isNaN(date.getTime())) {
        return false;
      }
      const isValidDate =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
      if (!isValidDate) {
        return false;
      }
      const today = new Date();
      const ageDiff = today.getFullYear() - year;
      if (ageDiff < 13) {
        return false;
      }
      return true;
    }, 'Ingresa una fecha válida (mayor de 13 años).'),
  country: z
    .string()
    .min(1, 'Selecciona tu país')
    .refine((value) => countryNames.includes(value), 'Selecciona un país válido'),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const orderedCountries = useMemo(() => {
    return [...countries].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      birthdate: '',
      country: '',
    },
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const formatBirthdate = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) {
      return digits;
    }
    if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const toIsoBirthdate = (value: string) => {
    const [day, month, year] = value.split('/');
    if (!day || !month || !year) {
      return value;
    }
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (values: SignUpFormValues) => {
    setFormError(null);
    const usernameWithAt = values.username.startsWith('@') ? values.username : `@${values.username}`;
    const normalizedUsername = usernameWithAt.trim();
    const isoBirthdate = toIsoBirthdate(values.birthdate);

    try {
      const { data: emailData, error: emailError } = await supabase.functions.invoke<{
        available: boolean;
      }>('check-email', {
        body: { email: values.email },
      });

      if (emailError) {
        if (/invalid api key/i.test(emailError.message ?? '')) {
          setFormError(
            'No se pudo validar el correo porque la anon key es inválida en las funciones. Revisa el despliegue de "check-email" y la variable SERVICE_ROLE_KEY.',
          );
        } else {
          console.warn('email_check_error', emailError);
        }
      } else if (emailData && !emailData.available) {
        setError('email', {
          type: 'manual',
          message: 'Este correo ya está registrado.',
        });
        return;
      }
    } catch (error) {
      console.warn('email_check_invoke_error', error);
    }

    try {
      const { data: checkData, error: checkError } = await supabase.functions.invoke<{
        available: boolean;
      }>('check-username', {
        body: { username: normalizedUsername },
      });

      if (checkError) {
        if (/invalid api key/i.test(checkError.message ?? '')) {
          setFormError(
            'No se pudo validar el usuario porque la anon key es inválida en las funciones. Revisa el despliegue de la función "check-username" y la variable SUPABASE_SERVICE_ROLE_KEY.',
          );
        } else {
          console.warn('username_check_error', checkError);
        }
      } else if (checkData && !checkData.available) {
        setError('username', {
          type: 'manual',
          message: 'Este nombre de usuario ya está en uso.',
        });
        return;
      }
    } catch (error) {
      console.warn('username_check_invoke_error', error);
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: undefined,
          data: {
            username: normalizedUsername,
            birthdate: isoBirthdate,
            birthdate_display: values.birthdate,
            country: values.country,
          },
        },
      });

      if (signUpError) {
        const message = signUpError.message ?? 'No se pudo crear la cuenta.';
        if (/registered|exists/i.test(message)) {
          setError('email', {
            type: 'manual',
            message: 'Este correo ya está registrado.',
          });
          return;
        }
        setFormError(message);
        return;
      }

      reset();
      router.replace('/(auth)/login');
    } catch (error) {
      console.warn('sign_up_error', error);
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError('Ocurrió un error inesperado. Inténtalo más tarde.');
      }
    }
  };

  return (
    <AuthBackground SvgBg={LoginBg} gifSource={require('../../assets/overlay.gif')}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
              <Text style={styles.helperText}>
                Regístrate para planear tu próximo viaje.
              </Text>

              <View style={styles.field}>
                <Text style={styles.label}>Correo electrónico</Text>
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
                      textContentType="emailAddress"
                      placeholder="tu@correo.com"
                      placeholderTextColor={placeholderColor}
                      style={styles.input}
                      accessibilityLabel="Campo para ingresar correo electrónico"
                    />
                  )}
                />
                {errors.email?.message ? (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                ) : null}
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Contraseña</Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.passwordWrapper}>
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Ingresa tu contraseña"
                        placeholderTextColor={placeholderColor}
                        secureTextEntry={!isPasswordVisible}
                        style={[styles.input, styles.passwordInput]}
                        accessibilityLabel="Campo para ingresar contraseña"
                        autoCapitalize="none"
                        textContentType="newPassword"
                      />
                      <Pressable
                        onPress={() => setIsPasswordVisible((prev) => !prev)}
                        hitSlop={12}
                        accessibilityRole="button"
                        accessibilityLabel={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        <Feather
                          name={isPasswordVisible ? 'eye-off' : 'eye'}
                          size={18}
                          color={placeholderColor}
                        />
                      </Pressable>
                    </View>
                  )}
                />
                {errors.password?.message ? (
                  <Text style={styles.errorText}>{errors.password.message}</Text>
                ) : null}
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Nombre de usuario</Text>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        const sanitized = text
                          .replace(/\s+/g, '')
                          .replace(/^@+/, '')
                          .replace(/[^A-Za-z0-9_.]/g, '');
                        const nextValue = sanitized ? `@${sanitized}` : '';
                        onChange(nextValue);
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="@usuario"
                      placeholderTextColor={placeholderColor}
                      style={styles.input}
                      accessibilityLabel="Campo para ingresar nombre de usuario"
                    />
                  )}
                />
                {errors.username?.message ? (
                  <Text style={styles.errorText}>{errors.username.message}</Text>
                ) : null}
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Fecha de nacimiento</Text>
                <Controller
                  control={control}
                  name="birthdate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={(text) => onChange(formatBirthdate(text))}
                      onBlur={onBlur}
                      placeholder="DD/MM/AAAA"
                      placeholderTextColor={placeholderColor}
                      keyboardType="number-pad"
                      inputMode="numeric"
                      maxLength={10}
                      style={styles.input}
                      accessibilityLabel="Campo para ingresar fecha de nacimiento"
                    />
                  )}
                />
                {errors.birthdate?.message ? (
                  <Text style={styles.errorText}>{errors.birthdate.message}</Text>
                ) : null}
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>País</Text>
                <Controller
                  control={control}
                  name="country"
                  render={({ field: { value } }) => (
                    <Pressable
                      onPress={() => setCountryModalVisible(true)}
                      style={styles.countrySelector}
                      accessibilityRole="button"
                      accessibilityLabel="Seleccionar país"
                    >
                      <Text style={[styles.inputText, !value && styles.placeholderText]}>
                        {value || 'Selecciona tu país'}
                      </Text>
                      <Feather name="chevron-down" size={18} color={placeholderColor} />
                    </Pressable>
                  )}
                />
                {errors.country?.message ? (
                  <Text style={styles.errorText}>{errors.country.message}</Text>
                ) : null}
              </View>

              <Pressable
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                accessibilityRole="button"
                accessibilityLabel="Crear cuenta en Foráneo"
                style={[styles.primaryButton, isSubmitting && styles.buttonDisabled]}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>Crear cuenta</Text>
                )}
              </Pressable>

              {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

              <View style={styles.footer}>
                <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
                <Link href="/(auth)/login" style={styles.footerLink}>
                  Inicia sesión
                </Link>
              </View>
            </View>
          </ScrollView>

          <Modal
            visible={countryModalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setCountryModalVisible(false)}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Selecciona tu país</Text>
                <FlatList
                  data={orderedCountries}
                  keyExtractor={(item) => item.code}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setValue('country', item.name, { shouldValidate: true });
                        setCountryModalVisible(false);
                      }}
                      style={styles.modalItem}
                      accessibilityRole="button"
                      accessibilityLabel={`Seleccionar ${item.name}`}
                    >
                      <Text style={styles.modalItemText}>{item.name}</Text>
                    </Pressable>
                  )}
                  ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
                />
                <Pressable
                  onPress={() => setCountryModalVisible(false)}
                  style={styles.modalCloseButton}
                  accessibilityRole="button"
                  accessibilityLabel="Cerrar selección de país"
                >
                  <Text style={styles.modalCloseText}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <AuthFloatingIcons />
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 48,
  },
  card: {
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 24,
    gap: 18,
  },
  helperText: {
    textAlign: 'center',
    fontSize: 12,
    color: helperText,
    fontFamily: 'Nunito',
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: primaryText,
    fontFamily: 'NunitoSemi',
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Nunito',
    color: primaryText,
    backgroundColor: '#FFFFFF',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  countrySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  inputText: {
    fontSize: 14,
    fontFamily: 'Nunito',
    color: primaryText,
  },
  placeholderText: {
    color: placeholderColor,
  },
  primaryButton: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: buttonColor,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'NunitoSemi',
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: helperText,
    fontFamily: 'Nunito',
  },
  footerLink: {
    fontSize: 12,
    color: '#37CFE3',
    fontFamily: 'NunitoSemi',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    maxHeight: '65%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 28,
    gap: 16,
  },
  modalTitle: {
    fontSize: 16,
    color: primaryText,
    fontFamily: 'NunitoSemi',
  },
  modalItem: {
    paddingVertical: 12,
  },
  modalItemText: {
    fontSize: 14,
    color: primaryText,
    fontFamily: 'Nunito',
  },
  modalSeparator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  modalCloseButton: {
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 14,
    color: primaryText,
    fontFamily: 'NunitoSemi',
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    fontFamily: 'Nunito',
  },
});

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
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthBackground from '../../src/components/AuthBackground';
import AuthFloatingIcons from '../../src/components/AuthFloatingIcons';
import LoginBg from '../../assets/login.svg';

const REGISTER_URL = 'https://api.tu-dominio.com/auth/register';

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

type SignUpFormValues = {
  email: string;
  password: string;
  username: string;
  birthdate: string;
  country: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);

  const orderedCountries = useMemo(() => {
    return [...countries].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      birthdate: '',
      country: '',
    },
    mode: 'onChange',
  });

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
        router.replace('/(auth)/login');
      }
    } catch (error) {
      // TODO: manejar errores de red.
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
                      placeholder="tu@correo.com"
                      placeholderTextColor={placeholderColor}
                      style={styles.input}
                      accessibilityLabel="Campo para ingresar correo electrónico"
                    />
                  )}
                />
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
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Fecha de nacimiento</Text>
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
                      style={styles.input}
                      accessibilityLabel="Campo para ingresar fecha de nacimiento"
                    />
                  )}
                />
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
                        setValue('country', item.name);
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
});

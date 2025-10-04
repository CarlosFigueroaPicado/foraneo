import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthBackground from '../../src/components/AuthBackground';
import AuthFloatingIcons from '../../src/components/AuthFloatingIcons';
import LoginBg from '../../assets/login.svg';

const buttonColor = '#2E3192';
const placeholderColor = '#D1D5DB';
const primaryText = '#111827';
const subtleText = '#9CA3AF';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    router.replace('/home');
  };

  return (
    <AuthBackground SvgBg={LoginBg} gifSource={require('../../assets/overlay.gif')}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <View style={styles.container}>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerTitle}>BIENVENIDO A FORÁNEO</Text>
              <Text style={styles.headerSubtitle}>
                Ingresa tus datos para continuar explorando el mundo Foráneo.
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.field}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="tu@correo.com"
                  placeholderTextColor={placeholderColor}
                  style={styles.input}
                  accessibilityLabel="Campo para ingresar correo electrónico"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor={placeholderColor}
                  style={styles.input}
                  accessibilityLabel="Campo para ingresar contraseña"
                />
              </View>

              <Pressable
                onPress={handleSignIn}
                accessibilityRole="button"
                accessibilityLabel="Iniciar sesión en la aplicación Foráneo"
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
              </Pressable>

              <View style={styles.footer}>
                <Text style={styles.footerText}>¿No tienes cuenta?</Text>
                <Link href="/(auth)/register" style={styles.footerLink}>
                  REGÍSTRATE AQUÍ
                </Link>
              </View>
            </View>
          </View>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 48,
    justifyContent: 'flex-start',
  },
  headerWrapper: {
    marginBottom: 32,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'BalooBold',
  },
  headerSubtitle: {
    marginTop: 12,
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Nunito',
  },
  card: {
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 24,
    gap: 16,
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
  primaryButton: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: buttonColor,
    paddingVertical: 12,
  },
  primaryButtonText: {
    textAlign: 'center',
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
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: subtleText,
    fontFamily: 'Nunito',
  },
  footerLink: {
    fontSize: 12,
    color: '#37CFE3',
    fontFamily: 'NunitoSemi',
  },
});

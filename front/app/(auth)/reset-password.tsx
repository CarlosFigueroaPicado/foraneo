import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthBackground from '../../src/components/AuthBackground';
import AuthFloatingIcons from '../../src/components/AuthFloatingIcons';
import LoginBg from '../../assets/login.svg';
import { supabase, supabaseConfigStatus } from '../../src/lib/supabase';

const buttonColor = '#2E3192';
const placeholderColor = '#D1D5DB';
const primaryText = '#111827';
const subtleText = '#9CA3AF';

const resetSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Ingresa un correo válido'),
});

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordScreen() {
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ResetFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(resetSchema),
    mode: 'onChange',
  });

  const handleReset = async (values: ResetFormValues) => {
    setFormError(null);
    setSuccessMessage(null);

    if (!supabaseConfigStatus.urlLoaded || !supabaseConfigStatus.anonKeyLoaded) {
      setFormError(
        'La configuración de Supabase no está completa. Verifica EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY.',
      );
      return;
    }

    if (supabaseConfigStatus.anonKeyLooksTruncated) {
      setFormError('La llave pública de Supabase parece incompleta. Revisa que no termine en "...".');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email);

      if (error) {
        setFormError(error.message ?? 'No se pudo enviar el correo de restablecimiento.');
        return;
      }

      setSuccessMessage('Te enviamos un enlace para restablecer tu contraseña. Revisa tu correo.');
      reset();
    } catch (error) {
      console.warn('reset_password_error', error);
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
          <View style={styles.container}>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerTitle}>RESTABLECER CONTRASEÑA</Text>
              <Text style={styles.headerSubtitle}>
                Ingresa tu correo electrónico y te enviaremos un enlace para crear una nueva contraseña.
              </Text>
            </View>

            <View style={styles.card}>
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
                      textContentType="username"
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

              <Pressable
                onPress={handleSubmit(handleReset)}
                accessibilityRole="button"
                accessibilityLabel="Enviar enlace de restablecimiento"
                style={[styles.primaryButton, isSubmitting && styles.buttonDisabled]}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>Enviar enlace</Text>
                )}
              </Pressable>

              {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
              {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

              <View style={styles.footer}>
                <Text style={styles.footerText}>¿Recordaste tu contraseña?</Text>
                <Link href="/(auth)/login" style={styles.footerLink}>
                  Inicia sesión
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
  buttonDisabled: {
    opacity: 0.6,
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
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    fontFamily: 'Nunito',
  },
  successText: {
    fontSize: 12,
    color: '#16A34A',
    fontFamily: 'Nunito',
  },
});

import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { Link } from 'expo-router';
import { supabase, getSession, signOut } from '../../src/lib/supabase';

type ServiceRow = {
  id: string;
  name: string;
  category: string | null;
};

export default function DebugSupabaseScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchSession = async () => {
      try {
        const currentSession = await getSession();
        if (mounted) {
          setSession(currentSession);
        }
      } catch (sessionError) {
        console.warn(sessionError);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, newSession: Session | null) => {
      setSession(newSession ?? null);
      },
    );

    fetchSession().catch(console.error);

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchServices = useCallback(async () => {
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('services')
        .select('id, name, category')
        .limit(5);

      if (fetchError) {
        throw fetchError;
      }

      setServices(data ?? []);
    } catch (fetchErr: any) {
      setError(fetchErr.message ?? 'No se pudo obtener la lista de servicios');
    }
  }, []);

  useEffect(() => {
    fetchServices().catch(console.error);
  }, [fetchServices]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchServices();
    setRefreshing(false);
  }, [fetchServices]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
    } catch (signOutError) {
      console.warn(signOutError);
    }
  }, []);

  const statusLabel = session ? 'Logged in' : 'Logged out';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-6">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-semibold text-neutral-900">Debug Supabase</Text>
            <Text className="mt-1 text-sm text-neutral-500">Estado actual: {statusLabel}</Text>
          </View>
          <Link href="/" className="text-sm font-semibold text-primary">
            Ir al inicio
          </Link>
        </View>

        <View className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <Text className="text-base font-semibold text-neutral-900">Sesión</Text>
          {session ? (
            <View className="mt-3 space-y-2">
              <Text className="text-sm text-neutral-600">
                Usuario: {session.user.email ?? 'Sin correo'}
              </Text>
              <Text className="text-xs text-neutral-400" selectable>
                UID: {session.user.id}
              </Text>
              <Text
                className="text-sm font-semibold text-red-500"
                onPress={handleSignOut}
                accessibilityRole="button"
              >
                Cerrar sesión
              </Text>
            </View>
          ) : (
            <Text className="mt-3 text-sm text-neutral-600">
              No hay usuario autenticado. Usa la pantalla de login para iniciar sesión.
            </Text>
          )}
        </View>

        <View className="mt-6 flex-1 rounded-2xl border border-neutral-200 bg-white p-4">
          <View className="flex-row items-baseline justify-between">
            <Text className="text-base font-semibold text-neutral-900">Servicios disponibles</Text>
            <Text className="text-xs uppercase tracking-widest text-neutral-400">máx. 5</Text>
          </View>

          {loading ? (
            <View className="mt-8 flex-1 items-center justify-center">
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              className="mt-4"
              data={services}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0f172a" />
              }
              ListEmptyComponent={
                <Text className="mt-10 text-center text-sm text-neutral-500">
                  {error ?? 'No hay servicios disponibles.'}
                </Text>
              }
              renderItem={({ item }) => (
                <View className="mb-3 rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                  <Text className="text-base font-semibold text-neutral-900">{item.name}</Text>
                  <Text className="mt-1 text-sm text-neutral-500">
                    Categoría: {item.category ?? 'Sin categoría'}
                  </Text>
                  <Text className="mt-1 text-xs uppercase tracking-[2px] text-neutral-400">ID: {item.id}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

import { useFonts } from 'expo-font';
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

/**
 * Custom hook to load all required fonts for the Foráneo application.
 *
 * @returns A boolean indicating whether fonts are loaded
 */
export function useAppFonts(): boolean {
  const [fontsLoaded] = useFonts({
    Baloo2_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  return fontsLoaded;
}

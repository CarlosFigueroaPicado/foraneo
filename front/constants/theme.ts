/**
 * Shared theme constants for the Foráneo application.
 * Includes colors, shadows, and other design tokens used across screens.
 */

export const colors = {
  gradientColors: ['#34D399', '#FACC15', '#22D3EE'] as const,
  buttonColor: '#2E3192',
  aquaAccent: '#37CFE3',
  primaryText: '#111827',
  subtleText: '#9CA3AF',
  helperText: '#6B7280',
  placeholderColor: '#D1D5DB',
} as const;

export const shadows = {
  cardShadow: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
  },
} as const;

export const fontFamilies = {
  baloo2Bold: 'Baloo2_700Bold',
  interRegular: 'Inter_400Regular',
  interSemiBold: 'Inter_600SemiBold',
} as const;

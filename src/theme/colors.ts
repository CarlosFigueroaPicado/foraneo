export const colors = {
  background: '#020617',
  backgroundAlt: '#0F172A',
  primary: '#38BDF8',
  primaryDark: '#0284C7',
  text: '#F8FAFC',
  textMuted: '#CBD5F5',
  border: '#1E293B',
} as const;

export type ColorToken = keyof typeof colors;

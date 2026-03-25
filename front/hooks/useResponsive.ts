import { useWindowDimensions } from 'react-native';
import { useMemo } from 'react';

export type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl';

export interface ResponsiveValues {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isXLarge: boolean;
  breakpoint: BreakpointKey;
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
}

const BREAKPOINTS = {
  sm: 480,   // Phone
  md: 768,   // Tablet portrait
  lg: 1024,  // Tablet landscape / Small desktop
  xl: 1280,  // Desktop
} as const;

/**
 * Hook to get responsive values based on screen dimensions
 * Follows mobile-first approach similar to Tailwind CSS
 */
export function useResponsive(): ResponsiveValues {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const isSmall = width < BREAKPOINTS.md;
    const isMedium = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
    const isLarge = width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl;
    const isXLarge = width >= BREAKPOINTS.xl;

    let breakpoint: BreakpointKey;
    if (isXLarge) breakpoint = 'xl';
    else if (isLarge) breakpoint = 'lg';
    else if (isMedium) breakpoint = 'md';
    else breakpoint = 'sm';

    return {
      isSmall,
      isMedium,
      isLarge,
      isXLarge,
      breakpoint,
      width,
      height,
      isPortrait: height > width,
      isLandscape: width > height,
    };
  }, [width, height]);
}

/**
 * Get a responsive value based on current breakpoint
 * @param values Object with values for each breakpoint (mobile-first)
 * @returns The value for the current breakpoint
 */
export function useResponsiveValue<T>(values: {
  base: T;
  md?: T;
  lg?: T;
  xl?: T;
}): T {
  const { breakpoint } = useResponsive();

  if (breakpoint === 'xl' && values.xl !== undefined) return values.xl;
  if (breakpoint === 'lg' && values.lg !== undefined) return values.lg;
  if ((breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl') && values.md !== undefined)
    return values.md;

  return values.base;
}

/**
 * Typography System - Wedding Studio
 * Đồng bộ font-size và line-height cho toàn bộ website
 */

export const typography = {
  // Display - Cho hero sections, landing pages
  display: {
    xl: 'text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight',
    lg: 'text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
    md: 'text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight',
    sm: 'text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight',
  },

  // Headings - Cho section titles
  heading: {
    h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight',
    h2: 'text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight',
    h3: 'text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug',
    h4: 'text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug',
    h5: 'text-lg sm:text-xl lg:text-2xl font-semibold leading-normal',
    h6: 'text-base sm:text-lg lg:text-xl font-semibold leading-normal',
  },

  // Body text - Cho paragraphs, descriptions
  body: {
    xl: 'text-xl leading-relaxed',
    lg: 'text-lg leading-relaxed',
    base: 'text-base leading-relaxed',
    sm: 'text-sm leading-normal',
    xs: 'text-xs leading-normal',
  },

  // Labels - Cho form labels, badges
  label: {
    lg: 'text-base font-semibold',
    base: 'text-sm font-semibold',
    sm: 'text-xs font-semibold',
  },

  // Buttons
  button: {
    lg: 'text-lg font-semibold',
    base: 'text-base font-semibold',
    sm: 'text-sm font-semibold',
  },

  // Links
  link: {
    base: 'text-base font-medium',
    sm: 'text-sm font-medium',
  },
} as const;

/**
 * Helper function để lấy typography class
 * @example
 * getTypography('heading', 'h1') // returns heading h1 classes
 */
export function getTypography(
  category: keyof typeof typography,
  size: string
): string {
  return (typography[category] as any)[size] || '';
}

/**
 * Gradient text utility
 */
export const gradientText = 'bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent';

/**
 * Common text colors
 */
export const textColors = {
  primary: 'text-gray-900',
  secondary: 'text-gray-600',
  muted: 'text-gray-500',
  accent: 'text-pink-600',
  error: 'text-red-600',
  success: 'text-green-600',
  white: 'text-white',
} as const;

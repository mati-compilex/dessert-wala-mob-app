/**
 * Dessert Wala App Colors
 * Brand-specific color palette for authentication and general UI
 */

export const AppColors = {
  // Primary Colors
  primary: '#B8651B', // Brown/Orange primary color
  primaryDark: '#9A5217',
  primaryLight: '#D4854A',

  // Neutral Colors
  text: {
    dark: '#1A1A1A', // Dark brown text
    medium: '#666666', // Medium gray
    light: '#999999', // Light gray
    error: '#D32F2F', // Error red
  },

  // Background Colors
  background: {
    white: '#FFFFFF',
    cream: '#F9F7F2', // Light cream background
    light: '#F5F3F0',
    input: '#FAFAFA',
  },

  // Border Colors
  border: {
    light: '#E0DDD8',
    medium: '#D0CDC8',
  },

  // Status Colors
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },

  // Social Colors
  social: {
    google: '#EA4335',
    apple: '#000000',
  },

  // Semantic
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
} as const;

export type AppColorKey = keyof typeof AppColors;

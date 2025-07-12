import { ThemeConfig } from 'antd';

// Define your brand colors
export const brandColors = {
  primary: '#1890ff',
  secondary: '#52c41a',
  accent: '#faad14',
  medical: {
    blue: '#1890ff',
    green: '#52c41a',
    teal: '#13c2c2',
    purple: '#722ed1',
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  semantic: {
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
  },
} as const;

// Light theme configuration
export const lightTheme: ThemeConfig = {
  token: {
    // Primary colors
    colorPrimary: brandColors.primary,
    colorSuccess: brandColors.semantic.success,
    colorWarning: brandColors.semantic.warning,
    colorError: brandColors.semantic.error,
    colorInfo: brandColors.semantic.info,

    // Background colors
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',

    // Text colors
    colorText: brandColors.neutral[800],
    colorTextSecondary: brandColors.neutral[600],
    colorTextTertiary: brandColors.neutral[400],

    // Border colors
    colorBorder: brandColors.neutral[200],
    colorBorderSecondary: brandColors.neutral[100],

    // Typography
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

    // Spacing
    padding: 16,
    paddingXS: 8,
    paddingSM: 12,
    paddingMD: 16,
    paddingLG: 24,
    paddingXL: 32,

    // Border radius
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 4,
    borderRadiusXS: 2,

    // Shadow
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    boxShadowSecondary: '0 4px 12px rgba(0, 0, 0, 0.08)',

    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    // Button customization
    Button: {
      borderRadius: 8,
      fontWeight: 600,
      primaryShadow: '0 2px 4px rgba(24, 144, 255, 0.2)',
    },

    // Card customization
    Card: {
      borderRadius: 12,
      headerBg: '#fafafa',
      actionsBg: '#fafafa',
    },

    // Input customization
    Input: {
      borderRadius: 8,
      paddingBlock: 12,
      paddingInline: 16,
    },

    // Typography customization
    Typography: {
      titleMarginBottom: 16,
      titleMarginTop: 0,
    },

    // Layout customization
    Layout: {
      headerBg: '#ffffff',
      footerBg: '#001529',
      siderBg: '#ffffff',
    },

    // Menu customization
    Menu: {
      itemBorderRadius: 8,
      itemMarginBlock: 4,
      itemMarginInline: 8,
    },

    // Carousel customization
    Carousel: {
      dotWidth: 12,
      dotHeight: 12,
      dotActiveWidth: 24,
    },
  },
};

// Dark theme configuration
export const darkTheme: ThemeConfig = {
  token: {
    // Primary colors
    colorPrimary: brandColors.primary,
    colorSuccess: brandColors.semantic.success,
    colorWarning: brandColors.semantic.warning,
    colorError: brandColors.semantic.error,
    colorInfo: brandColors.semantic.info,

    // Background colors
    colorBgBase: '#141414',
    colorBgContainer: '#1f1f1f',
    colorBgElevated: '#262626',
    colorBgLayout: '#000000',

    // Text colors
    colorText: 'rgba(255, 255, 255, 0.88)',
    colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
    colorTextTertiary: 'rgba(255, 255, 255, 0.45)',

    // Border colors
    colorBorder: '#424242',
    colorBorderSecondary: '#303030',

    // Typography
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

    // Spacing (same as light theme)
    padding: 16,
    paddingXS: 8,
    paddingSM: 12,
    paddingMD: 16,
    paddingLG: 24,
    paddingXL: 32,

    // Border radius (same as light theme)
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 4,
    borderRadiusXS: 2,

    // Shadow
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.45)',
    boxShadowSecondary: '0 4px 12px rgba(0, 0, 0, 0.55)',

    // Motion (same as light theme)
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    // Button customization
    Button: {
      borderRadius: 8,
      fontWeight: 600,
      primaryShadow: '0 2px 4px rgba(24, 144, 255, 0.4)',
    },

    // Card customization
    Card: {
      borderRadius: 12,
      headerBg: '#262626',
      actionsBg: '#262626',
    },

    // Input customization
    Input: {
      borderRadius: 8,
      paddingBlock: 12,
      paddingInline: 16,
    },

    // Layout customization
    Layout: {
      headerBg: '#141414',
      footerBg: '#000000',
      siderBg: '#141414',
    },

    // Menu customization
    Menu: {
      itemBorderRadius: 8,
      itemMarginBlock: 4,
      itemMarginInline: 8,
    },
  },
};

// Theme type definitions
export type ThemeMode = 'light' | 'dark';

export interface CustomTheme {
  mode: ThemeMode;
  antdTheme: ThemeConfig;
  brandColors: typeof brandColors;
}

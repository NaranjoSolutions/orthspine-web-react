import { ThemeConfig } from 'antd';

/**
 * Ant Design Theme Configuration
 * Customizes Ant Design components to match OrthSpine branding
 */
export const antdTheme: ThemeConfig = {
  token: {
    // Brand Colors
    colorPrimary: '#007BB9',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',

    // Typography
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 16,
    fontSizeHeading1: 32,
    fontSizeHeading2: 28,
    fontSizeHeading3: 24,

    // Border Radius
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,

    // Spacing
    marginXS: 8,
    marginSM: 12,
    margin: 16,
    marginMD: 20,
    marginLG: 24,
    marginXL: 32,

    // Layout
    padding: 16,
    paddingLG: 24,
    paddingXL: 32,

    // Shadow
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    boxShadowSecondary: '0 4px 16px rgba(0, 0, 0, 0.12)',
  },
  components: {
    Button: {
      controlHeight: 44,
      controlHeightLG: 52,
      controlHeightSM: 36,
      fontWeight: 600,
      primaryShadow: '0 2px 0 rgba(0, 123, 185, 0.1)',
    },
    Input: {
      controlHeight: 44,
      controlHeightLG: 52,
      paddingBlock: 10,
      paddingInline: 16,
      fontSize: 16,
    },
    Form: {
      labelFontSize: 14,
      labelColor: '#4b5563',
      verticalLabelPadding: '0 0 8px',
    },
    Checkbox: {
      fontSize: 14,
    },
  },
};

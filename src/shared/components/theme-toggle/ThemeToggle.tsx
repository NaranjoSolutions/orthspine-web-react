import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '../../theme/ThemeContext';
import './ThemeToggle.scss';

interface ThemeToggleProps {
  size?: 'small' | 'middle' | 'large';
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
  showText?: boolean;
}

export function ThemeToggle({ size = 'middle', type = 'text', showText = false }: ThemeToggleProps): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme.mode === 'dark';
  const icon = isDark ? <SunOutlined /> : <MoonOutlined />;
  const text = isDark ? 'Light' : 'Dark';

  return (
    <Button
      type={type}
      size={size}
      icon={icon}
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {showText && text}
    </Button>
  );
}

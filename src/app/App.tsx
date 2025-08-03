import { Layout } from 'antd';
import { AppRoutes } from '../routes/AppRoutes';
import { Navbar } from '../shared/components/header';
import { AppFooter } from '../shared/components/footer';
import { ErrorBoundary } from '../shared/components/error-boundary/ErrorBoundary';
import { ScrollToTop } from '../shared/components/scroll-to-top/ScrollToTop';
import { ThemeProvider } from '../shared/theme/ThemeContext';
import './App.scss';
import { WhatsAppFloat } from '../shared/components/whatsapp-float/WhatsAppFloat';

const { Content } = Layout;

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ErrorBoundary>
        <Layout className="app-layout">
          <Navbar />
          <Content className="main-content">
            <AppRoutes />
          </Content>
          <AppFooter />
          <WhatsAppFloat />
          <ScrollToTop />
        </Layout>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

import { Layout } from 'antd';
import { AppRoutes } from '../routes/AppRoutes';
import { WhatsAppFloat } from '../shared/components/whatsapp-float';
import { Navbar } from '../shared/components/header';
import { AppFooter } from '../shared/components/footer';

const App = () => {
  return (
    <Layout>
      <Navbar />
      <AppRoutes />
      <AppFooter />
      <WhatsAppFloat />
    </Layout>
  );
};

export default App;

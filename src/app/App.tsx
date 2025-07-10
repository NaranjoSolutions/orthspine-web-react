import 'antd/dist/reset.css'; // Import Ant Design CSS

import { SiderMenu } from '../components/layout/sider-menu/SiderMenu';
import { Layout } from 'antd';
import { AppHeader } from '../components/layout/app-header/AppHeader';
import { AppFooter } from '../components/layout/app-footer/AppFooter';
import sytles from './App.module.css';
import { AppFloatButton } from '../components/shared/float-buttons/WhatsAppFloatButton';
import { AppRoutes } from './routes/AppRoutes';

const { Content } = Layout;

const App = () => {
  return (
    <Layout className={sytles.layout}>
      <SiderMenu />
      <Layout>
        <AppHeader />
        <Content className={sytles.appContent}>
          <AppRoutes />
        </Content>
        <AppFooter />
      </Layout>
      <AppFloatButton />
    </Layout>
  );
};

export default App;

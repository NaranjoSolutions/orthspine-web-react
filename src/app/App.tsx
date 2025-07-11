import { Layout } from 'antd';
import './App.module.scss';
import { AppRoutes } from './routes/AppRoutes';
import { Navbar } from '../shared/components/navbar/Navbar';

const App = () => {
  return (
    <Layout>
      <Navbar />
      <AppRoutes />
    </Layout>
  );
};

export default App;

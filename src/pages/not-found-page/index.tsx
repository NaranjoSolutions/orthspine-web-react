import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>404 - Página no encontrada</h1>
      <p>La página que buscas no existe o fue movida.</p>
      <Button type="primary" onClick={() => navigate('/')}>
        Volver a inicio
      </Button>
    </div>
  );
};
export default NotFound;

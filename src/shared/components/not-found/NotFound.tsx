import { Button, Result, Space, Typography } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import './NotFound.scss';

const { Paragraph } = Typography;

export function NotFound() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className={`not-found-container not-found-container--${theme.mode}`}>
      <div className="not-found-content">
        <Result
          className="not-found-result"
          status="404"
          title="404"
          subTitle="Lo sentimos, la página que buscas no existe."
          extra={
            <Space direction="vertical" size="middle" className="not-found-actions">
              <Paragraph className="not-found-description">
                La página que intentas acceder no se encuentra disponible o ha sido movida.
              </Paragraph>
              <Space size="middle" wrap>
                <Button
                  type="primary"
                  icon={<HomeOutlined />}
                  size="large"
                  onClick={() => navigate('/')}
                  className="not-found-home-btn"
                >
                  Ir al Inicio
                </Button>
                <Button
                  icon={<ArrowLeftOutlined />}
                  size="large"
                  onClick={() => navigate(-1)}
                  className="not-found-back-btn"
                >
                  Regresar
                </Button>
              </Space>
            </Space>
          }
        />
      </div>
    </div>
  );
}

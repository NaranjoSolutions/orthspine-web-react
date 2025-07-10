import { Col, Layout, Row, Space, Typography } from 'antd';
import { iconsFooter } from './AppFooterContent';
import { clinicInformation } from '../../../resources/clinicInformation';
import styles from './AppFooter.module.css';

const { Footer } = Layout;
const { Text } = Typography;

export const AppFooter: React.FC = () => {
  const { name } = clinicInformation;

  return (
    <Footer className={styles.footer}>
      <Row justify={'center'} style={{ marginTop: '5px' }}>
        <Col>
          <Text strong style={{ fontSize: '16px' }}>
            {name}
          </Text>
        </Col>
      </Row>
      <Space style={{ marginTop: '5px' }}>
        {iconsFooter.map(({ id, href, target, rel, icon }) => (
          <a key={id} href={href} target={target} rel={rel}>
            {icon}
          </a>
        ))}
      </Space>
      <Row justify={'center'} style={{ marginTop: '5px' }}>
        <Col>
          <Text>Copyright © {new Date().getFullYear()} - Develop by Alonso</Text>
        </Col>
      </Row>
    </Footer>
  );
};

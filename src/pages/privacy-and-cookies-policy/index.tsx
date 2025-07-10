import React from 'react';
import { Typography, List, Layout } from 'antd';
import { policySectionData } from '../../resources/policyCookies';
import { clinicInformation } from '../../resources/clinicInformation';
import styles from './PrivacyAndCookies.module.css';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const PrivacyAndCookiesPolicy: React.FC = () => {
  return (
    <Typography>
      <Title level={1}>Política de Privacidad y Cookies</Title>

      <Paragraph className={styles.policyIntroParagraph}>
        En Orthopedic Spine, nos comprometemos a proteger la privacidad de nuestros usuarios y al tratamiento adecuado
        de sus datos personales conforme a la Ley, cuando corresponda.
      </Paragraph>

      {/* Table of Contents */}
      <Content className={styles.tableOfContent}>
        <Title level={3}> Contenido</Title>
        <List
          dataSource={policySectionData}
          renderItem={(section) => (
            <List.Item>
              <a href={`#${section.id}`}>{section.title || section.subTitle}</a>
            </List.Item>
          )}
        />
      </Content>

      {/* Policy Sections */}
      {policySectionData.map((section) => (
        <div key={section.id} id={section.id}>
          {section.title && <Title level={3}>{section.title}</Title>}
          {section.subTitle && <Paragraph>{section.subTitle}</Paragraph>}
          <List
            dataSource={section.items}
            renderItem={(item) => (
              <List.Item>
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </div>
      ))}

      <Paragraph style={{ marginTop: '20px' }}>
        <Text strong>Nunca vendemos tus datos personales.</Text>
      </Paragraph>

      <Title level={3}>Contacto</Title>
      <Paragraph>
        Si tienes preguntas o deseas ejercer tus derechos de privacidad:
        <br />
        <Text strong>Email:</Text> {clinicInformation.contact.email}
      </Paragraph>
    </Typography>
  );
};

export default PrivacyAndCookiesPolicy;

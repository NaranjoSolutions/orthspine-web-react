import { Col, Divider, Layout, Menu, message, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { setSearchQuery, setSiderMenuSelectedKey } from '../../../store/redux/slices/uiSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDividerStyle, useLogoStyle } from '../../../styles/globalStyle';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from '../../../store/redux/slices/userSlice';
import styles from './SiderMenu.module.css';
import { siderMenuitems } from './SiderMenuContent';

const { Sider } = Layout;

const SiderMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoStyle = useLogoStyle();
  const dividerStyle = useDividerStyle();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { collapsed, siderMenuSelectedKey } = useSelector(
    (state: RootState) => ({
      collapsed: state.ui.siderMenuCollapsed,
      siderMenuSelectedKey: state.ui.siderMenuSelectedKey,
    }),
    shallowEqual,
  );
  const { loggedIn } = useSelector(
    (state: RootState) => ({
      loggedIn: state.user.loggedIn,
    }),
    shallowEqual,
  );

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOnSelectMenu = useCallback(
    (item: { key: string }) => {
      dispatch(setSearchQuery(''));
      dispatch(setSiderMenuSelectedKey(item.key));
      navigate(item.key);
    },
    [dispatch, navigate],
  );

  const onClickLogo = () => {
    navigate('/');
  };

  const onLogout = () => {
    dispatch(logout());
    message.success('Cierre de sesión exitoso!');
    navigate('/');
  };

  return (
    <Sider width={150} collapsedWidth={90} trigger={null} collapsible collapsed={collapsed || isMobile}>
      <Row justify="center" align="middle">
        <Col span={20}>
          <img src={logo} alt="logo" loading="lazy" style={logoStyle} onClick={onClickLogo} />
        </Col>
        <Divider style={dividerStyle} />
      </Row>

      <div className={styles.menuContainer}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[siderMenuSelectedKey]}
          items={siderMenuitems}
          onSelect={handleOnSelectMenu}
        />

        {!!loggedIn && (
          <div>
            <Divider style={dividerStyle} />
            <Menu
              theme="dark"
              mode="inline"
              items={[
                {
                  key: '/logout',
                  icon: <LogoutOutlined />,
                  label: 'Salir',
                },
              ]}
              onSelect={onLogout}
              style={{ marginTop: 'auto' }} // Ensures it stays at the bottom
            />
          </div>
        )}
      </div>
    </Sider>
  );
};

export { SiderMenu };

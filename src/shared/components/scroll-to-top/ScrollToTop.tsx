import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import './ScrollToTop.scss';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<UpOutlined />}
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    />
  );
};

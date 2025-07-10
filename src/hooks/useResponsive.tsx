import { useEffect, useState } from 'react';

// SSR-safe function to determine initial mobile state
const getIsMobile = (breakpoint: number) => (typeof window !== 'undefined' ? window.innerWidth < breakpoint : false);

// Custom hook to handle responsive state with customizable breakpoint
export const useResponsive = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(() => getIsMobile(breakpoint));

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile(breakpoint));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};
